import { render, screen, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { SearchBar } from "@/components/ui/search-bar"
import jest from "jest" // Import jest to fix the undeclared variable error

const mockProps = {
  value: "",
  onChange: jest.fn(),
  onSearch: jest.fn(),
  suggestions: [],
  isLoading: false,
}

describe("SearchBar", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders search input correctly", () => {
    render(<SearchBar {...mockProps} />)

    const searchInput = screen.getByRole("combobox", { name: /search/i })
    expect(searchInput).toBeInTheDocument()
  })

  it("calls onChange when user types", async () => {
    const user = userEvent.setup()
    render(<SearchBar {...mockProps} />)

    const searchInput = screen.getByRole("combobox", { name: /search/i })
    await user.type(searchInput, "test query")

    expect(mockProps.onChange).toHaveBeenCalledWith("test query")
  })

  it("calls onSearch when Enter is pressed", async () => {
    const user = userEvent.setup()
    render(<SearchBar {...mockProps} value="test query" />)

    const searchInput = screen.getByRole("combobox", { name: /search/i })
    await user.type(searchInput, "{enter}")

    expect(mockProps.onSearch).toHaveBeenCalledWith("test query")
  })

  it("displays suggestions when provided", () => {
    const suggestions = [
      { query: "test suggestion 1", type: "suggestion" as const },
      { query: "test suggestion 2", type: "history" as const },
    ]

    render(<SearchBar {...mockProps} suggestions={suggestions} />)

    // Focus the input to show suggestions
    const searchInput = screen.getByRole("combobox", { name: /search/i })
    fireEvent.focus(searchInput)

    expect(screen.getByText("test suggestion 1")).toBeInTheDocument()
    expect(screen.getByText("test suggestion 2")).toBeInTheDocument()
  })

  it("handles keyboard navigation through suggestions", async () => {
    const user = userEvent.setup()
    const suggestions = [
      { query: "suggestion 1", type: "suggestion" as const },
      { query: "suggestion 2", type: "suggestion" as const },
    ]

    render(<SearchBar {...mockProps} suggestions={suggestions} />)

    const searchInput = screen.getByRole("combobox", { name: /search/i })
    await user.click(searchInput)

    // Navigate down
    await user.keyboard("{ArrowDown}")
    await user.keyboard("{ArrowDown}")

    // Press Enter to select
    await user.keyboard("{Enter}")

    expect(mockProps.onSearch).toHaveBeenCalledWith("suggestion 2")
  })

  it("shows loading state", () => {
    render(<SearchBar {...mockProps} isLoading={true} />)

    const searchInput = screen.getByRole("combobox", { name: /search/i })
    fireEvent.focus(searchInput)

    expect(screen.getByRole("status")).toBeInTheDocument()
  })

  it("clears search when clear button is clicked", async () => {
    const user = userEvent.setup()
    render(<SearchBar {...mockProps} value="test" />)

    const clearButton = screen.getByRole("button", { name: /clear search/i })
    await user.click(clearButton)

    expect(mockProps.onChange).toHaveBeenCalledWith("")
  })

  it("has proper accessibility attributes", () => {
    render(<SearchBar {...mockProps} />)

    const searchInput = screen.getByRole("combobox", { name: /search/i })

    expect(searchInput).toHaveAttribute("aria-expanded", "false")
    expect(searchInput).toHaveAttribute("aria-haspopup", "listbox")
    expect(searchInput).toHaveAttribute("aria-describedby", "search-suggestions")
  })
})
