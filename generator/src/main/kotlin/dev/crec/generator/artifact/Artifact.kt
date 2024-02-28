package dev.crec.generator.artifact

import dev.crec.generator.artifact.source.SourceProvider

interface Artifact {
    val id: String
    val source: SourceProvider

    suspend fun download()
}

