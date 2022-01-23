package main

import (
	"github.com/Crec0/carpet-rules-database/backend/reader"
	"os"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func main() {
	f, err := os.Open("../data/carpet.java")
	check(err)

	buffer := make([]byte, 1024*1024)
	size, err := f.Read(buffer)

	check(err)
	check(f.Close())

	reader.ExtractRules(buffer[:size])
}
