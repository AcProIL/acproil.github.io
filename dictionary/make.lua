-- Regex to find duplicated lines: ^(.*),(.*),.*,.*\n\1,\2

local source = io.open ('dictionary.csv', 'r')
local tex = [[
% Inspired by a template by Marc Lavaud

\documentclass[8pt]{amsbook}
\usepackage[paperwidth=6in, paperheight=9in]{geometry}

\usepackage{concrete, euler}
\usepackage[T1]{fontenc}
\usepackage{microtype}
\usepackage{ifthen}
\usepackage{graphicx}
\usepackage{multicol}

\usepackage{fancyhdr}
\fancyhead[L]{\rightmark} % Top left header
\fancyhead[R]{\leftmark} % Top right header
\renewcommand{\headrulewidth}{1pt}
\pagestyle{fancy}

\newcommand{\entry}[4]{\par\noindent\textbf{#1}\markboth{#1}{#1} #2. #3\ifthenelse{\equal{#4}{}}{}{ \textit{#4}}}

\title{English-Latino~sine~Flexione Dictionary}
\author{Academia pro~Interlingua}

\begin{document}
\maketitle
\begin{multicols}{2}
]]

local last_letter = ''
for line in source:lines() do
    local first_letter = line:sub(1, 1):upper()
    if last_letter ~= first_letter then
        last_letter = first_letter
        tex = tex..'\n\\section*{'..last_letter..'}\n'
    end
    tex = tex..'\\entry{'..string.gsub(line, ',', '}{')..'}\n'
end

source:close()
tex = tex..'\\end{multicols}\\end{document}'

local file = io.open('dictionary.tex', 'w')
file:write(tex)
file:close()
