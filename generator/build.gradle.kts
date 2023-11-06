plugins {
    val kotlinVersion = "1.9.20"

    kotlin("jvm") version (kotlinVersion)
    kotlin("plugin.serialization") version (kotlinVersion)
    id("com.github.johnrengelman.shadow") version "8.1.1"
    application
}

group = "dev.crec"
version = "1.0-SNAPSHOT"

val projectName = "generator"

application.mainClass.set("dev.crec.hawksbill.MainKt")

repositories {
    maven {
        name = "Jitpack"
        url = uri("https://jitpack.io")
    }
    gradlePluginPortal()
    mavenCentral()
}

dependencies {
    implementation(platform(kotlin("bom")))
    implementation(kotlin("stdlib-jdk8"))

    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.7.3")

    implementation("ch.qos.logback:logback-classic:1.4.4")
    implementation("io.github.microutils:kotlin-logging-jvm:3.0.4")

    implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.5.0")

    implementation("com.squareup.okhttp3:okhttp:4.10.0")
    implementation("io.github.classgraph:classgraph:4.8.149")
    implementation("net.peanuuutz.tomlkt:tomlkt:0.3.7")
}

tasks {
    compileJava {
        options.compilerArgs.add("--enable-preview")
        sourceCompatibility = "21"
        targetCompatibility = "21"
    }

    compileKotlin {
        kotlinOptions {
            jvmTarget = "21"
            freeCompilerArgs = listOf("-opt-in=kotlin.RequiresOptIn")
        }
        exclude("**/modules/rcon")
        exclude("**/modules/chatbridge")
    }

    shadowJar {
        archiveFileName.set("$projectName.jar")
    }
}

kotlin {
    sourceSets.all {
        languageSettings {
            languageVersion = "2.0"
        }
    }
}
