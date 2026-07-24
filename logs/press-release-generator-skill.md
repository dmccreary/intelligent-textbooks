# Session Log: Creating the `press-release-generator` Skill

**Date:** 2026-06-19
**Participant:** Dan McCreary
**Outcome:** A new reusable skill (`press-release-generator`) added to the
`claude-skills` repo, plus its first real output — an AP-style press release
announcing the *Seizure-Safe Schools* textbook (EDAN, https://edanmn.github.io/).

> Filename note: the request asked for `press-release-genertor-skill.md`; the
> obvious typo was corrected to `press-release-generator-skill.md`.

---

## 1. The Request

> "We have a wonderful new textbook *Seizure-Safe Schools* about supporting
> students with epilepsy in the state of Minnesota. Our advocates indicate that
> there should be a press release. Is there a press release skill to announce
> this textbook? https://edanmn.github.io/"

Two questions were embedded: (a) does a press-release skill already exist, and
(b) if not, what's the right way to produce one.

---

## 2. Did a Press-Release Skill Already Exist?

**No.** A scan of the installed skill set found no dedicated press-release skill.
The nearest neighbors were:

| Skill | Why it's close | Why it's not a fit |
|---|---|---|
| `linkedin-announcement-generator` | Announces a textbook; pulls book metrics | Produces a social post, not a formal release (no dateline, boilerplate, media contact, `###`) |
| `readme-generator` | Project communications | GitHub docs, not media outreach |
| `case-study-generator`, `docx-to-web-publisher` | Content generation | Unrelated formats |

A press release and a LinkedIn post optimize for **different readers**, which
became the central design principle of the new skill (see §4).

---

## 3. Web Research: Tested Press-Release Skills for Claude Code

At Dan's request, searched for an existing, tested press-release skill rather
than building blind. Verified candidates directly via the GitHub API (the
marketplace blurbs were partly misleading).

**Candidate A — `inference-sh/skills` → `guides/writing/press-release-writing/SKILL.md`**
- Repo: **548★, 88 forks**, actively maintained.
- Genuinely good: proper `SKILL.md`, **AP style + inverted pyramid**, dateline
  rules with AP month abbreviations, headline do/don'ts, 5-W lead, quote rules,
  boilerplate, media contact, ❌/✅ examples for every section.
- **Caveats:** `license: none` (all-rights-reserved → reference, don't copy
  verbatim); soft dependency on the proprietary inference.sh `belt` CLI for the
  fact-checking step (the formatting core works standalone).

**Candidate B — `kyosuke25/claude-code-press-release-skills`**
- **0★, entirely Japanese**, old-style `/press-release` command (not `SKILL.md`),
  last touched Jan 2026. Not a fit for an English MN/epilepsy release.

**Decision:** Don't install A wholesale. Borrow its **AP-style format as a
reference** and combine it with the **metric-extraction machinery already in
`linkedin-announcement-generator`** to build a textbook-aware, CC-licensed,
dependency-free skill that Dan controls and can reuse across his ~111 books.

---

## 4. Skill Design

**File:** `claude-skills/skills/press-release-generator/SKILL.md` (~290 lines,
single-file, `license: MIT`, mirroring `linkedin-announcement-generator`).

Three design decisions, each driven by something learned during the session:

1. **Two operating modes.** The skill must work *inside a textbook repo*
   (canonical `docs/learning-graph/book-metrics.json`) **and** *against a live
   deployed site* (sitemap-derived facts). This was forced by reality:
   Seizure-Safe Schools is published but not checked out locally, and the site
   does not deploy `book-metrics.json`. Step 2B documents the sitemap fallback.

2. **AP-style discipline, not LinkedIn voice.** The skill explicitly warns
   against metric-dump bullets, emoji, hashtags, and first person — the wrong
   instrument for an editor. It embeds the proven AP format: headline (title
   case, present tense, no period, no superlatives), dateline (correct AP month
   abbreviations), 5-W lead, inverted pyramid, attributed quotes, "About"
   boilerplate, `###` end mark.

3. **An integrity guard.** Because a release goes on the public record and
   editors fact-check it, the skill **refuses to fabricate** quotes, contacts,
   partners, dates, or statistics. It uses the journalist's `[TK]` ("to come")
   and `[DRAFT]` markers instead, and surfaces every gap to the user. This rule
   directly shaped the Seizure-Safe Schools output (the quote is a flagged
   draft, the phone is `[TK]`).

The skill reuses, unchanged, the `book-metrics.json` extraction pattern and the
`mkdocs.yml` / `docs/course-description.md` reads from
`linkedin-announcement-generator`, so all artifacts report identical numbers.

---

## 5. First Run — Sourcing & Verifying Seizure-Safe Schools

No local repo and no published `book-metrics.json`, so the skill ran in
**live-site mode**. The sitemap and a few targeted fetches produced a verified
factual skeleton:

| Fact | Value | Source (verified) |
|---|---|---|
| Title / publisher | *Seizure-Safe Schools* — An Intelligent Textbook; EDAN | home page |
| Publisher detail | Epilepsy Data & Advocacy Network, student-led, MN-based, free | about page |
| Founder / contact | Rishik Kondadadi (MN high-school student); edanmnorg@gmail.com | about page |
| Chapters | 9 (00–08) | sitemap.xml |
| Interactive simulations | 4 (504-vs-iep, call-911, recognize-seizure, seizure-first-aid) | sitemap.xml |
| Other | glossary, FAQ, quizzes, "find your district" tool | sitemap.xml |
| The law | Minn. Stat. § 121A.24, effective 2022-23 school year | MN Dept. of Health + revisor.mn.gov |
| **News hook (data)** | **231 of 328 districts (~70%) post no public seizure plan**; ~half have no licensed nurse | textbook Ch. 5 analysis |

The **law-vs-reality gap** is the story: a state law has required seizure
readiness since 2022-23, yet the group's own records analysis found ~70% of
districts post no findable plan — and the textbook is the proposed fix
("do the work for them" with ready-to-use materials).

The two highest-risk facts (the statute number/requirements and the headline
statistic) were independently verified before being written into the lead —
exactly what the skill's integrity guard prescribes.

---

## 6. The Generated Press Release

```text
FOR IMMEDIATE RELEASE

Student-Led Group Releases Free Textbook to Help Minnesota Schools Meet Seizure-Safety Law
Analysis Finds About 7 in 10 Districts Post No Public Seizure Plan Years After the Requirement Took Effect

ST. PAUL, Minn., June 19, 2026 — A student-led group today released a free, interactive
textbook to help Minnesota schools prepare for student seizures — a basic step its research
shows most districts have not taken publicly, despite a four-year-old state requirement.

About 1 in 100 people has epilepsy, and most seizures that happen at school are handled by
teachers and staff rather than medical professionals. Yet of Minnesota's 328 school districts,
231 — roughly 70 percent — post no publicly findable seizure plan, according to the group's
analysis of public records. About half of districts have no licensed school nurse on staff.

"Most seizures at school are handled by the people in the classroom, not by doctors, so those
staff and families deserve materials they can actually use," said Rishik Kondadadi, a Minnesota
high school student and founder of the Epilepsy Data & Advocacy Network. "We didn't want to
simply tell small districts they were out of compliance — we wanted to do the work for them."

The textbook, Seizure-Safe Schools, walks readers through nine chapters covering how to recognize
a seizure, seizure first aid, Minnesota's seizure-safety law, written seizure action plans, and a
student's rights under Section 504 and IEP plans. It includes four interactive simulations — among
them when to call 911 and how to give seizure first aid — along with quizzes, a glossary, and a
tool to look up information by school district. All of it is written in plain language and offered
at no cost.

Minnesota Statutes Section 121A.24, in effect since the 2022-23 school year, requires districts to
create a seizure action plan for any student whose family requests one and to give staff self-study
materials on recognizing and responding to seizures. The group's analysis frames the shortfall as a
capacity gap rather than defiance: smaller districts, concentrated in Greater Minnesota, often lack
the nursing and administrative resources to write and post a plan. The textbook is designed to give
those districts ready-to-use materials.

Seizure-Safe Schools is available free at https://edanmn.github.io/.

About the Epilepsy Data & Advocacy Network
The Epilepsy Data & Advocacy Network (EDAN) is a student-led initiative that uses public data to
advance epilepsy awareness, advocacy, and safety. The student-run, non-commercial group is based in
Minnesota and offers all of its work at no cost. Learn more at https://edanmn.github.io/.

Media Contact:
Rishik Kondadadi
Epilepsy Data & Advocacy Network
edanmnorg@gmail.com
[TK: phone number — optional]

###
```

---

## 7. Advice — Before This Goes Out

The skill deliberately flagged these rather than inventing them. **Confirm each
before distribution:**

1. **The quote is a `[DRAFT]`.** It is built from EDAN's own Chapter 5 stance
   ("do the work for them"), but Rishik Kondadadi should approve or reword it.
   Never send an unapproved quote attributed to a real, named person — an editor
   may call to confirm it.
2. **Dateline city.** `ST. PAUL` was used as a defensible statewide-policy
   dateline (state capital, seat of the law). Change it to EDAN's actual home
   city if preferred.
3. **Phone.** Left as `[TK]` — add one or delete the line.
4. **Date.** Set to the session date (June 19, 2026); change to the real send
   date. (Reminder: AP spells out March–July; abbreviates Jan., Feb., Aug.,
   Sept., Oct., Nov., Dec.)
5. **Optional second quote.** A school nurse, parent, or special-education
   educator would add a human, third-party voice and strengthen pickup.

Everything else — 9 chapters, 4 simulations, the 231/328 figure, Statute
121A.24, the 2022-23 effective date, EDAN's self-description, the contact email
— is verified against the live site and the official Minnesota statute.

### Distribution notes

- Send as **pasted plain text in the email body plus a PDF**, not only an
  attachment — many editors won't open attachments from unknown senders.
- Best-fit outlets for this story: Minnesota local/regional dailies (education
  and health desks), education trade press, and epilepsy/disability and
  school-nurse advocacy newsletters. The Greater-Minnesota capacity angle is a
  natural fit for outstate/regional outlets.
- A back-to-school re-send (August) would give the same release a second, timely
  news peg.

---

## 8. Possible Next Steps (offered, not yet done)

- **Tweak the release:** alternate angle (back-to-school, parent-interest lead),
  a shorter media-advisory version, or add the second quote slot.
- **Optimize the skill's triggering:** run skill-creator's description optimizer
  so the skill fires reliably on phrasings like "write a press release" or
  "announce this to the media."
- **Save the release into EDAN's repo** if it gets checked out locally.

---

## 9. Sources & References

- inference-sh press-release-writing skill — https://github.com/inference-sh/skills (548★)
- (weak alt) kyosuke25 — https://github.com/kyosuke25/claude-code-press-release-skills
- Minn. Stat. § 121A.24 — https://www.revisor.mn.gov/statutes/cite/121A.24
- MN Dept. of Health, Managing Seizures in School — https://www.health.state.mn.us/people/childrenyouth/schoolhealth/hco/seizures.html
- Seizure-Safe Schools textbook — https://edanmn.github.io/
- Ch. 5 (data/case study) — https://edanmn.github.io/chapters/05-the-data-case-study/

## Artifacts produced this session

- `claude-skills/skills/press-release-generator/SKILL.md` — the new skill
- `intelligent-textbooks/logs/press-release-generator-skill.md` — this log
