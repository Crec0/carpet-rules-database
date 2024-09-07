package dev.crec.generator.artifact.source

import com.squareup.moshi.Moshi
import okhttp3.OkHttpClient
import java.net.URI

class ModrinthProvider(client: OkHttpClient, moshi: Moshi) : AbstractProvider(client, moshi) {
    override suspend fun process(projectId: String) {
        TODO("Not yet implemented")
    }

    override suspend fun processVersion(projectId: String, fileId: String, bytes: ByteArray) {
        TODO("Not yet implemented")
    }
}
