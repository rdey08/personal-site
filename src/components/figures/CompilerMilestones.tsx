// The seven graded milestones, registered in mdx-components so
// content/projects/compiler.mdx can place it.
//
// The production count is the column that carries the argument. Milestone 4
// added no syntax at all, 28 productions in and 28 out, and was the largest
// conceptual change in the project: it is where the program stopped
// recognising input and started translating it. A prose sentence claiming
// that is unconvincing; the flat number next to a full row of new machinery
// is not. Milestone 6 is the second jump, for the reasons the page gives.
//
// Deliberately carries no grades. Those are personal academic records.

const ROWS = [
  {
    n: 1,
    date: "18 Sep",
    added: "Scanner and a minimal grammar. A recogniser, no output",
    prods: 6,
  },
  {
    n: 2,
    date: "13 Oct",
    added: "Functions, arguments, expressions",
    prods: 16,
  },
  {
    n: 3,
    date: "22 Oct",
    added: "Symbol table, globals, declarations, undeclared-variable errors",
    prods: 28,
  },
  {
    n: 4,
    date: "8 Nov",
    added: "AST, and the first generated assembly",
    prods: 28,
    jump: true,
  },
  {
    n: 5,
    date: "19 Nov",
    added: "if/else, while, subtraction, readInt",
    prods: 34,
  },
  {
    n: 6,
    date: "6 Dec",
    added: "Locals, parameters, fp frames, global arrays",
    prods: 41,
    jump: true,
  },
  {
    n: 7,
    date: "12 Dec",
    added: "return, do-while, parentheses, bitwise and unary operators",
    prods: 48,
  },
];

export function CompilerMilestones() {
  return (
    <figure className="my-8">
      <figcaption className="mb-4 max-w-[var(--measure)] text-sm text-ink-muted">
        Seven milestones, September to December. The two marked in accent are
        the ones that changed how the compiler worked rather than what it
        accepted.
      </figcaption>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-line-strong">
              <th
                scope="col"
                className="py-2 pr-3 text-left text-xs font-semibold tracking-[0.12em] text-ink-faint uppercase"
              >
                #
              </th>
              <th
                scope="col"
                className="py-2 pr-4 text-left text-xs font-semibold tracking-[0.12em] text-ink-faint uppercase"
              >
                Date
              </th>
              <th
                scope="col"
                className="py-2 pr-4 text-left text-xs font-semibold tracking-[0.12em] text-ink-faint uppercase"
              >
                Added
              </th>
              <th
                scope="col"
                className="py-2 text-right text-xs font-semibold tracking-[0.12em] text-ink-faint uppercase"
              >
                Prods
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {ROWS.map((row) => (
              <tr key={row.n} className={row.jump ? "text-ink-strong" : ""}>
                <th
                  scope="row"
                  className={`py-2.5 pr-3 text-left font-normal tabular-nums ${
                    row.jump ? "font-medium text-accent" : "text-ink-muted"
                  }`}
                >
                  {row.n}
                </th>
                <td className="py-2.5 pr-4 whitespace-nowrap text-ink-muted">
                  {row.date}
                </td>
                <td
                  className={`py-2.5 pr-4 ${row.jump ? "text-ink-strong" : "text-ink"}`}
                >
                  {row.added}
                </td>
                <td
                  className={`py-2.5 text-right tabular-nums ${
                    row.jump ? "font-medium text-accent" : "text-ink-muted"
                  }`}
                >
                  {row.prods}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}
