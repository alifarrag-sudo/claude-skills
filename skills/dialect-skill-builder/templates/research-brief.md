# Shared brief for deep-source researchers ({{MARKET}} dialect mastery skill)

Copy this to `research/sources/_brief.md` in your project, replace every `{{...}}`, and swap the example source lists for ones that fit your market. The Saudi lists below are a worked example from the first build.

GOAL: the rules of each {{MARKET}} dialect (phonology, morphology, syntax, lexicon, idioms, proverbs, how it is written) drawn from BOOKS, DICTIONARIES, GRAMMARS, THESES, JOURNAL ARTICLES, COURSES and HERITAGE WORKS, not blogs. The skill built from this will write and judge {{MARKET}}-dialect copy, so the rules must be right.

DEPTH RULES ("do not just take from the first thing you find")
1. Read `research/literature.md` first (the sections for your group plus the cross-dialect sections). It is the first pass. Your job is to go deeper: verify its claims, fill every [gap] for your group, and resolve [contested] points where sources allow.
2. A rule enters the "Rules" section only when at least TWO independent sources support it (different authors, not one citing the other). Rules with one source go under "Single-source claims". Conflicts go under "Where sources disagree" with both sides cited.
3. Search wide, in the target language AND English, across at least these source types, and log what each search returned (even "nothing"):
   - archive.org: use its API from the shell, e.g. `curl -s "https://archive.org/advancedsearch.php?q=<urlencoded query>&fl[]=identifier,title,creator,year&rows=50&output=json"`, then read full text from `https://archive.org/download/<identifier>/<identifier>_djvu.txt`. Many heritage dictionaries, dialect studies and proverb collections live there.
   - University repositories and theses. Example (Saudi build): Essex, Leeds, York (White Rose), Manchester, Newcastle, SOAS, Leiden, UEA, Edinburgh, Georgetown, plus the market's own universities (KSU, KAU, Umm al-Qura, IMSIU, KFUPM); ProQuest open abstracts; Google Scholar.
   - Journals. Example (Arabic): Journal of Semitic Studies, Zeitschrift für arabische Linguistik, Arabica, Languages (MDPI), Arab World English Journal, plus the market's own heritage and language-academy journals.
   - Book libraries in the target language. Example (Arabic): noor-book.com, waqfeya.net, Google Books previews, national heritage foundations, the national language academy, the Ministry of Culture.
   - Courses and teaching: FSI, Peace Corps, university syllabi, published textbooks for the dialect and their sample pages.
4. TOOLS: {{TOOL_WEB_SEARCH}} first, any other web search and fetch as fallback, curl for the archive.org API and plain-text files. Read texts online; do not save PDFs or books to disk (save only your notes).
5. Paywalled book? Use its table of contents, publisher sample, Google Books snippets, reviews, and theses that quote it, and say which you used.

OUTPUT: `research/sources/<your-file>.md` with sections:
  A. Bibliography table: title | author | year | type (book/dictionary/thesis/article/course/heritage) | language | URL | what you could access (full/partial/abstract) | reliability note
  B. Rules (2+ sources each): phonology; pronouns and suffixes; verbs (tense, aspect, future, negation, imperative); demonstratives, question words, relatives; prepositions and particles; plural and gender patterns; syntax quirks; sub-regional splits. Each rule: statement, native-script examples with English gloss, sources.
  C. Lexicon: 100+ words/expressions distinctive to your group, each with meaning, example, sub-region, age/register note, source.
  D. Proverbs, idioms, set phrases, greetings and blessings with meaning and usage.
  E. Single-source claims.  F. Where sources disagree.  G. Search log (queries tried and what came back, including dead ends).
Never invent a source, quote or page. Tag your own inference as [inference].

STOP-AND-FLAG: if the web tools fail, or archive.org blocks access, stop and report the blocker in your final message rather than filling from memory.

FINAL MESSAGE: 10 lines: strongest new findings beyond literature.md, number of sources by type, the gaps you could not close.
