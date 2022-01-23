package reader

type Rule struct {
	Name        string
	Description string
	Extra       []string
	Categories  []string
	Type        string
	Value       string
	Options     []string
	Strict      bool
}
