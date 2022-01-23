package reader

import (
	"github.com/Crec0/carpet-rules-database/backend/readers"
	"strings"
)

func ExtractRules(buffer []byte) {
	readers.Parse(buffer)
}

func removeEmptySplitAndTrim(str string) []string {
	clean := make([]string, 0)
	strSplit := strings.Split(str, ",")
	for _, opt := range strSplit {
		if opt != "" {
			clean = append(clean, strings.Trim(strings.Trim(opt, " "), "\""))
		}
	}
	return clean
}
