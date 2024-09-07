package dev.crec.generator

import com.squareup.moshi.Moshi
import com.squareup.moshi.kotlin.reflect.KotlinJsonAdapterFactory
import dev.crec.generator.artifact.cache.CacheManager
import dev.crec.generator.artifact.source.curseforge.CurseforgeProvider
import kotlinx.coroutines.asCoroutineDispatcher
import kotlinx.coroutines.runBlocking
import okhttp3.Interceptor
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.Response
import java.io.IOException
import java.util.concurrent.Executors


internal class LoggingInterceptor : Interceptor {
    @Throws(IOException::class)
    override fun intercept(chain: Interceptor.Chain): Response {
        val request: Request = chain.request()
        val t1 = System.nanoTime()
        println(
            String.format(
                "Sending request %s on %s%n%s",
                request.url, chain.connection(), request.headers
            )
        )
        val response: Response = chain.proceed(request)
        val t2 = System.nanoTime()
        println(
            String.format(
                "Received response for %s in %.1fms%n%s",
                response.request.url, (t2 - t1) / 1e6, response.headers
            )
        )
        return response
    }
}

val dispatcher = Executors.newVirtualThreadPerTaskExecutor().asCoroutineDispatcher()

val client = OkHttpClient.Builder().build()

val moshi: Moshi = Moshi.Builder()
    .addLast(KotlinJsonAdapterFactory())
    .build()

val cacheManager = CacheManager(moshi)

fun main(args: Array<String>) {
    cacheManager.load()
    val cf = CurseforgeProvider(client, moshi)
    runBlocking {
        cf.process("349239")
    }
    cacheManager.save()
}
