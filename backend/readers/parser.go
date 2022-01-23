package readers

import (
	"fmt"
)

func Parse(buffer []byte) {
	reader := stringReader{
		buffer,
		0,
		len(buffer),
	}

	tokens := reader.tokenize()
	fmt.Println(tokens)
}
