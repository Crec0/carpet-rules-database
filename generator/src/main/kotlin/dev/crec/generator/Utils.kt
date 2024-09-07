package dev.crec.generator

import kotlinx.coroutines.async
import kotlinx.coroutines.awaitAll
import kotlinx.coroutines.runBlocking
import kotlinx.coroutines.sync.Semaphore
import okhttp3.HttpUrl
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.executeAsync

fun HttpUrl.getRequest() = Request.Builder().url(this).build()

fun String.getRequest() = Request.Builder().url(this).build()

suspend fun OkHttpClient.execute(request: Request) = this.newCall(request).executeAsync()

suspend fun <T, R> Iterable<T>.mapConcurrently(
    concurrency: Int,
    transform: suspend (T) -> R
): List<R> = runBlocking {
    val semaphore = Semaphore(concurrency)
    map { item ->
        semaphore.acquire()
        async(dispatcher) {
            try {
                transform(item)
            } finally {
                semaphore.release()
            }
        }
    }.awaitAll()
}

suspend fun <T, R> Iterable<T>.mapIndexedConcurrently(
    concurrency: Int,
    transform: suspend (Int, T) -> R
): List<R> = runBlocking {
    val semaphore = Semaphore(concurrency)
    mapIndexed { idx, item ->
        semaphore.acquire()
        async(dispatcher) {
            try {
                transform(idx, item)
            } finally {
                semaphore.release()
            }
        }
    }.awaitAll()
}