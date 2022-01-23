package readers

var skipables = map[string]string{
	"/*":      "*/",
	"//":      "\n",
	"private": " ",
	"public":  " ",
	"static":  " ",
	"final":   " ",
}

func (s *stringReader) tokenize() []string {
	tokens := make([]string, s.size/2)
	// TODO
	return tokens
}

// peek Peeks at the next character in the sequence
func (s *stringReader) peek() byte {
	if s.hasNext() {
		return s.buffer[s.cursor+1]
	}
	return '\000'
}

func (s *stringReader) hasNext() bool {
	return s.cursor < s.size && s.buffer[s.cursor+1] != '\000'
}

func (s *stringReader) hasPrev() bool {
	return s.cursor >= 0 && s.buffer[s.cursor-1] != '\000'
}

func (s *stringReader) next() byte {
	if s.hasNext() {
		s.cursor++
		return s.buffer[s.cursor]
	}
	return '\000'
}

func (s *stringReader) prev() byte {
	if s.hasPrev() {
		s.cursor--
		return s.buffer[s.cursor]
	}
	return '\000'
}

func (s *stringReader) nextToken() string {
	var token string
	for s.hasNext() && !isAlphaNumeric(s.peek()) {
		token += string(s.next())
	}
	return token
}
