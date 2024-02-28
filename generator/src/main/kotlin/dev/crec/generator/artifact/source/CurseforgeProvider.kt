package dev.crec.generator.artifact.source

import com.squareup.moshi.Json
import com.squareup.moshi.Moshi
import com.squareup.moshi.adapter
import dev.crec.generator.execute
import dev.crec.generator.getRequest
import okhttp3.HttpUrl
import okhttp3.OkHttpClient
import okio.FileSystem
import okio.HashingSink.Companion.sha256
import okio.HashingSink.Companion.sha512
import okio.Path.Companion.toOkioPath
import okio.blackholeSink
import okio.buffer
import kotlin.io.path.Path
import kotlin.io.path.createDirectories

private fun String.toCurseURL() = HttpUrl.Builder()
    .scheme("https")
    .host("curseforge.com")
    .addPathSegments("api/v1/mods")
    .addPathSegment(this)
    .addPathSegment("files")
    .addQueryParameter("pageSize", "10000")
    .build()

class CurseforgeProvider(client: OkHttpClient, moshi: Moshi) : AbstractProvider(client, moshi) {

    @OptIn(ExperimentalStdlibApi::class)
    private val curseAdapter = moshi.adapter<FilesResponseSchema>()

    private fun filterCachedVersions(metadataList: List<ModFileMetadata>): List<ModFileMetadata> {
        metadataList.forEach {
            println(it.hash)
        }
        return metadataList
    }

    override suspend fun process() {
        val modRequest = "349240".toCurseURL().getRequest()
        val metadata = client.execute(modRequest).use { curseAdapter.fromJson(it.body.string()) }
            ?: throw IllegalStateException("Metadata should be valid")

        val uncachedVersions = filterCachedVersions(metadata.data)

        uncachedVersions.forEach { file ->
            val cdnReq = file.toCDN().getRequest()
            val bytes = client.execute(cdnReq).use { it.body.bytes() }
            val hash = sha512(blackholeSink()).use { sink ->
                sink.buffer().use { buf -> buf.write(bytes) }
                sink.hash.hex()
            }
            println(file.fileName + " " + hash)
            val path = Path("downloads/${hash.substring(0, 2)}/${hash.substring(2, 4)}/${hash.drop(4)}").let {
                it.parent.createDirectories()
                it.toOkioPath()
            }

            FileSystem.SYSTEM.sink(path).use { fs ->
                fs.buffer().use { buf -> buf.write(bytes) }
            }
        }
    }

}


data class FilesResponseSchema(
    val data: List<ModFileMetadata>,
    val pagination: Pagination
)

data class ModFileMetadata(
    val id: Long,
    val dateCreated: String,
    val dateModified: String,
    val displayName: String? = null,
    val fileLength: Long,
    val fileName: String,
    val status: Long,
    val gameVersions: List<String>,
    @Json(name = "gameVersionTypeIds")
    val gameVersionTypeIDS: List<Long>,
    val releaseType: Long,
    val totalDownloads: Long,
    val user: User,
    val additionalFilesCount: Long,
    val hasServerPack: Boolean,
    val additionalServerPackFilesCount: Long,
    val isEarlyAccessContent: Boolean
) {
    val filteredGameVersions =
        gameVersions.filterNot { it.contains("Java ") || it.contains("Snapshot") || it.contains("Fabric") }

    val hash = sha256(blackholeSink()).use { sink ->
        sink.buffer().use { buf -> buf.write(this.toString().toByteArray()) }
        sink.hash.hex()
    }

    /*
    * CurseForge CDN uses the file id + file name to index files.
    * The pattern (from testing) seems to be first 4 digits / rest of the digits + file name
    * The zero padding has to be removed from digits as well.
    * This function takes the id and converts it into the desired 4-3, 4-2 or 4-1 path
    *
    * Example:
    *   1234500 -> 1234/500
    *   1234050 -> 1234/50
    *   1234005 -> 1234/5
    */
    fun toCDN(): String {
        val match = Regex("(\\d{4})(\\d{3})").find(id.toString())
            ?: throw IllegalArgumentException("CurseForge id: $id doesn't conform to 4-3 split strategy")

        val filePath = match.groupValues.drop(1).joinToString("/") { it.toInt().toString() }
        return "https://edge.forgecdn.net/files/$filePath"
    }
}

data class User(
    val username: String,
    val id: Long,
    @Json(name = "twitchAvatarUrl")
    val twitchAvatarURL: String,
    val displayName: String
)

data class Pagination(
    val index: Long,
    val pageSize: Long,
    val totalCount: Long
)
