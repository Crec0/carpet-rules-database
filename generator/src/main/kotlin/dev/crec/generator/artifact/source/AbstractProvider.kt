package dev.crec.generator.artifact.source

import com.squareup.moshi.Moshi
import okhttp3.OkHttpClient

abstract class AbstractProvider(
    override val client: OkHttpClient,
    override val moshi: Moshi
) : ModProvider
