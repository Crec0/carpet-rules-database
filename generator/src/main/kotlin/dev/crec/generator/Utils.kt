package dev.crec.generator

import okhttp3.HttpUrl
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.executeAsync

fun HttpUrl.getRequest() = Request.Builder().url(this).build()

fun String.getRequest() = Request.Builder().url(this).build()

suspend fun OkHttpClient.execute(request: Request) = this.newCall(request).executeAsync()
