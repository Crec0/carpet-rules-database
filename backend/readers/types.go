package readers

type stringReader struct {
	buffer []byte
	cursor int
	size   int
}
