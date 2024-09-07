package dev.crec.generator.artifact.source

import com.squareup.moshi.Moshi
import okhttp3.OkHttpClient

interface ModProvider {
    val client: OkHttpClient
    val moshi: Moshi

    suspend fun process(projectId: String)
    suspend fun processVersion(projectId: String, fileId: String, bytes: ByteArray)
}
