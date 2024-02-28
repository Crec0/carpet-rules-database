package dev.crec.generator.artifact.source

import com.squareup.moshi.Moshi
import okhttp3.OkHttpClient

abstract class AbstractProvider(val client: OkHttpClient, val moshi: Moshi) : IProvider {
    private val versionList: MutableList<String> = mutableListOf()

    fun submitVersion(version: String) {
        this.versionList.add(version)
    }

    abstract suspend fun process()
}
