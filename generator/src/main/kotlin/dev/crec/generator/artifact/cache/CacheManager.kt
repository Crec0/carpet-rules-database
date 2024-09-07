package dev.crec.generator.artifact.cache

import com.squareup.moshi.Moshi
import com.squareup.moshi.adapter
import okio.FileSystem
import okio.Path.Companion.toOkioPath
import okio.buffer
import java.nio.charset.Charset
import java.util.concurrent.CopyOnWriteArraySet
import kotlin.io.path.Path


class CacheManager(moshi: Moshi) {
    private val root = Path("cache.json").toOkioPath()
    private val cache = CopyOnWriteArraySet<String>()

    @OptIn(ExperimentalStdlibApi::class)
    private val adapter = moshi.adapter<List<String>>()

    fun addToCache(projectId: String, fileId: Long) = cache.add("$projectId/$fileId")
    fun addToCache(projectId: String, fileId: String) = cache.add("$projectId/$fileId")

    fun isCached(projectId: String, fileId: Long) = cache.contains("$projectId/$fileId")
    fun isCached(projectId: String, fileId: String) = cache.contains("$projectId/$fileId")

    fun save() {
        FileSystem.SYSTEM.sink(root).use { fs ->
            val byteArr = adapter.toJson(cache.toList()).toByteArray()
            fs.buffer().use { buf -> buf.write(byteArr) }
        }
    }

    fun load() {
        if (!root.toFile().exists()) {
            root.toFile().createNewFile()
            return
        }
        FileSystem.SYSTEM.source(root).use { fs ->
            val byteArr = fs.buffer().readString(Charset.defaultCharset())
            if (byteArr.isEmpty()) return

            cache.addAll(adapter.fromJson(byteArr) ?: emptyList())
        }
    }
}

data class CacheObject(
    val data: String
)