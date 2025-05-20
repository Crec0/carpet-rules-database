import org.jetbrains.kotlin.gradle.dsl.JvmTarget

plugins {
    kotlin("jvm") version ("2.1.21")
    id("com.github.johnrengelman.shadow") version "8.1.1"
    application
}

group = "dev.crec"
version = "1.0-SNAPSHOT"

val projectName = "generator"

application.mainClass.set("dev.crec.generator.MainKt")

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

    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.10.2")

    implementation("ch.qos.logback:logback-classic:1.5.18")
    runtimeOnly("io.github.microutils:kotlin-logging-jvm:3.0.5")

    implementation("com.squareup.moshi:moshi-kotlin:1.15.2")
    implementation("com.squareup.moshi:moshi-adapters:1.15.2")

    implementation("com.squareup.okhttp3:okhttp:5.0.0-alpha.14")
    implementation("com.squareup.okhttp3:okhttp-coroutines:5.0.0-alpha.14")

    implementation("org.ow2.asm:asm:9.7.1")
    implementation("net.peanuuutz.tomlkt:tomlkt:0.4.0")
}

tasks {
    compileJava {
        options.compilerArgs.add("--enable-preview")
        sourceCompatibility = "17"
        targetCompatibility = "17"
    }

    shadowJar {
        archiveFileName.set("$projectName.jar")
    }
}

kotlin {
    compilerOptions {
        jvmTarget.set(JvmTarget.JVM_17)
        freeCompilerArgs = listOf("-opt-in=kotlin.RequiresOptIn")
        extraWarnings.set(true)
    }
}
