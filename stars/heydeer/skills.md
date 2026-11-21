---
project: skills
stars: 2
description: |-
    Agent skills from the team behind HeyDeer
url: https://github.com/heydeer/skills
---

# HeyDeer skills

Agent skills from the team behind [HeyDeer](https://heydeer.ai), for Claude
Code, Codex, Cursor and any other agent that loads skills.

| Skill | For | What it does |
|---|---|---|
| [`ci-audit`](#ci-audit) | Everyone | Audits your repository's CI for speed and cost, tells you what you could save each month, and makes the fixes you pick |

Install a skill by name:

```bash
npx skills@latest add heydeer/skills --skill ci-audit
```

Always pass `--skill`. Without it the CLI installs every skill in this
repository, including ones written for HeyDeer users that you may have no
use for. `npx skills@latest add heydeer/skills --list` shows what is here.

## For everyone

These work on any repository and recommend no product, ours included.

### ci-audit

Coding agents push far more commits than people do, and every push reruns the
pipeline. CI is now where PRs wait and, for many teams, the second-largest
engineering bill after model tokens. This skill has your agent measure where
the time and money actually go before it changes anything.

```bash
npx skills@latest add heydeer/skills --skill ci-audit
```

Then run it with no arguments. It reads your last two weeks of workflow runs
and opens with the two numbers below, and it changes nothing until you say so.

```
/ci-audit
```

In Codex, skills start with `$`: type `$ci-audit`.

Or ask it something specific:

```
/ci-audit why do PR checks take 20 minutes?
/ci-audit which jobs are flaky?
/ci-audit is macOS on every pull request worth what it costs?
/ci-audit make the safe fixes
```

It runs only when you ask for it. Claude Code, Cursor and Codex are told not
to start it on their own; in other agents its instructions say to wait until
asked.

#### What you get

**Two numbers first.** The report opens with what you could save each
month if you keep your runners, and what you could save if you also switch
them. Everything behind those numbers is in the report underneath.

```
> Estimated savings (of an estimated $769 a month, $30.23 of it earlier attempts of re-run runs)
> - Keeping your runners: about $626 a month (81%, $7,510 a year)
> - Switching runners too: about $701 a month (91%, $8,410 a year), with jobs on the
>   cheapest machine type and the lowest managed list price in the provider table

Keeping your runners
| Fix                                                   | Tier          | Saves/mo |
| Stop running the workflow on both push and PR         | safe          | $325     |
| Cancel runs when a newer commit is pushed             | safe          | $69.86   |
| Fix the jobs that fail and then pass on a re-run      | check first   | $0.52    |
| Make dependency caches hit                            | check first   | $36.58   |
| Run macOS legs that never failed alone after merge    | your decision | $189     |

Switching runners too (on top of the rows above)
| Run jobs under 30 seconds on a 1-vCPU runner          | check first   | $1.36    |
| Move Linux x64 jobs to arm64 at the same provider     | check first   | $8.77    |
| Move jobs to the lowest managed list price            | your decision | $64.87   |

Wait: a passing commit waits p50 36m58s today. Its longest single job takes 14m54s.
```

**A measurement, not a checklist.** A bundled read-only script pulls your
recent GitHub Actions runs through `gh` and reports:

- how long a PR waits for green checks (p50 and p90), split into waiting on
  earlier jobs, queueing for a runner, setup, and real work
- every job's queue, setup and work time, billed minutes and failure rate
- what each matrix leg costs, and whether it ever failed when the others passed
- billed minutes and estimated dollars by runner type, projected to a month
- work that bought nothing, in minutes and dollars: superseded runs that kept
  running, double triggers, per-minute rounding, re-runs
- flaky jobs: the ones that failed and then passed on a re-run of the same
  commit, with the step that failed
- what your Linux, Windows and macOS minutes would cost at each runner
  provider's list price
- cache hits and misses read from the job logs (the silent kind of slow)
- how many CI rounds each PR takes, who triggers them, and what share of
  minutes went to commits that were later replaced

```
- PR feedback time, commits that pass: p50 36m58s, p90 38m58s over 46 commits.
- All PR commits: p50 29m32s. 60% of them fail, and hear about it p50 9m29s after the push.
- Where a passing commit's wait goes: before its last job is created 29m32s (81%),
  queue 9s (0%), setup 2m59s (8%), work 3m58s (11%).
- Estimated cost: $332 in the window, about $739 a month.

Signals
- macOS/Windows jobs are 34% of billed minutes and 84% of estimated cost ($279)
- CI ran on both `push` and `pull_request` for the same commit (5437 billed minutes, $139)
- The last job of a passing PR commit is only created 29m32s after the push: a `needs:` chain
- `test (macos-latest, 22)` never failed alone in 188 jobs (2262 billed minutes, $140)
- 72 runs kept going after a newer commit was pushed; cancelling would have saved $64.34
- PRs from acme-coder[bot] take 4.2 CI rounds each, and CI failed on 68% of their commits
- `test` missed a cache in 4 of 4 sampled logs
```

*(Both samples are from the synthetic repository used to test the skill.
Savings are estimates at list prices; the skill has your agent confirm each
one in the workflow files before it goes into the report.)*

**Findings ranked by measured payoff**, each with its evidence, expected
effect and risk, sorted into three tiers:

- **Safe:** cancel superseded runs, stop double triggers, parallelize, add
  timeouts, fix cache keys
- **Check first:** swap in faster tools, change test isolation, shard, resize
  machines, after proving the results match
- **Your decision:** anything that changes what a PR is checked against or
  what you pay, such as moving the full suite to a merge queue, test
  selection, or a different runner provider

**Small PRs, one lever each**, with the before number and the expected after
number, and a re-measurement once they merge.

**A budget guardrail:** a weekly workflow that opens an issue when PR checks
drift back over your time budget.

It never pushes to your default branch or changes repository settings, and
it says exactly where a check moved whenever one stops running on PRs.

#### Requirements

Needs Python 3.8 or later and read access to the repository's Actions: either
the [`gh` CLI](https://cli.github.com), signed in, or a token in `GH_TOKEN`
or `GITHUB_TOKEN`. Without either, the script stops and says what to set up. The measurement script supports GitHub
Actions; the method and the reference material apply to any CI.

You can also run the script by itself:

```bash
python3 skills/ci-audit/scripts/ci_audit.py --repo owner/name --days 14
```

#### What's inside

```
skills/ci-audit/
├── SKILL.md                  the workflow: measure, read, report, change, verify
├── scripts/ci_audit.py       the measurement script (standard library only, read-only)
├── references/
│   ├── measure.md            what each number means and how far to trust it
│   ├── quick-wins.md         concurrency, triggers, parallel jobs, path filters, timeouts
│   ├── caching.md            why caches silently miss, and the fixes
│   ├── tests-and-tools.md    profiling tests, sharding, flakes, faster tools
│   ├── do-less-per-pr.md     layered validation, affected-only, test selection, merge queues
│   ├── runners.md            queue time, machine size, pricing, comparing providers
│   └── fewer-rounds.md       cutting the number of CI runs a PR needs
└── assets/
    └── ci-budget.yml         the weekly budget workflow
```

#### Where the ideas come from

The playbook distills what teams have published about CI at agent speed,
including Owen Gretzinger's
[20× faster CI at Boardy](https://x.com/owengretzinger/status/2116291924219060319),
Kun Chen on
[test selection](https://x.com/kunchenguid/status/2115565245293039814) and
[four validation layers](https://x.com/kunchenguid/status/2122391325081579618),
Yonas Beshawred's
[analysis of OpenAI's CI changes](https://x.com/yonasbe/status/2113333745042514102),
and Nx's
[five things for faster, cheaper CI](https://nx.dev/blog/five-things-faster-cheaper-ci).
Kevin Guo's [optimize-ci](https://github.com/2018kguo/optimize-ci) is a good
companion: a deep account of one TypeScript monorepo's journey, where this
skill is a stack-neutral audit that starts from your own numbers.

## For HeyDeer users

Skills for teams that review their pull requests with HeyDeer will be added
here. There are none yet.

## About

[HeyDeer](https://heydeer.ai) is built by ETOILEE PTE. LTD., a company
registered in Singapore. Contact: hey@heydeer.ai

## License

MIT. Copyright (c) 2026 ETOILEE PTE. LTD.

