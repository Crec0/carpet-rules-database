package dev.crec.generator.artifact.source.curseforge

import com.squareup.moshi.Moshi
import com.squareup.moshi.adapter
import dev.crec.generator.artifact.source.AbstractProvider
import dev.crec.generator.cacheManager
import dev.crec.generator.execute
import dev.crec.generator.getRequest
import dev.crec.generator.mapConcurrently
import okhttp3.HttpUrl
import okhttp3.OkHttpClient
import java.util.zip.ZipInputStream


class CurseforgeProvider(client: OkHttpClient, moshi: Moshi) : AbstractProvider(client, moshi) {

    @OptIn(ExperimentalStdlibApi::class)
    private val curseAdapter = moshi.adapter<FilesResponseSchema>()

    private fun filterCachedVersions(projectId: String, metadataList: List<ModFileMetadata>): List<ModFileMetadata> {
        return metadataList.filterNot { cacheManager.isCached(projectId, it.id) }.take(1)
    }

    override suspend fun process(projectId: String) {
        val modRequest = projectId.toCurseURL().getRequest()
        val metadata = client.execute(modRequest).use { curseAdapter.fromJson(it.body.string()) }
            ?: throw IllegalStateException("Metadata should be valid")

        val uncachedVersions = filterCachedVersions(projectId, metadata.data)


        uncachedVersions.mapConcurrently(5) { meta ->
            val cdnReq = meta.toCDN().getRequest()
            val bytes = client.execute(cdnReq).use { it.body.bytes() }

            ZipInputStream(bytes.inputStream()).use { it ->
                var entry = it.nextEntry
                while (entry != null) {
                    println(entry.name)
                    entry = it.nextEntry
                }
            }

            processVersion(projectId, meta.id.toString(), bytes)

            cacheManager.addToCache(projectId, meta.id)
        }
    }

    override suspend fun processVersion(projectId: String, fileId: String, bytes: ByteArray) {
        println("Processing $fileId")
    }

    companion object {
        fun String.toCurseURL() = HttpUrl.Builder()
            .scheme("https")
            .host("curseforge.com")
            .addPathSegments("api/v1/mods")
            .addPathSegment(this)
            .addPathSegment("files")
            .addQueryParameter("pageSize", "10000")
            .build()
    }
}
