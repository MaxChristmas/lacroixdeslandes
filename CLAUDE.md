# CLAUDE.md

## Comportement automatique

### SEO Specialist (subagent)

Quand l'utilisateur pose une question liée au SEO (référencement, mots-clés, balises meta, sitemap, structured data, Core Web Vitals, rankings, backlinks, optimisation de contenu pour les moteurs de recherche, etc.), lance automatiquement un subagent via l'outil Agent avec les paramètres suivants :

- **subagent_type**: `general-purpose`
- **model**: `haiku`
- **prompt**: utilise le contenu du fichier `.claude/agents/seo.md` comme prompt système + la question de l'utilisateur + le contexte du projet

### Business Analyst (subagent)

Quand l'utilisateur pose une question liée à l'analyse business (processus métier, recueil de besoins, amélioration de processus, KPIs, ROI, analyse de données métier, gestion des parties prenantes, etc.), lance automatiquement un subagent via l'outil Agent avec les paramètres suivants :

- **subagent_type**: `general-purpose`
- **model**: `sonnet`
- **prompt**: utilise le contenu du fichier `.claude/agents/business-analyst.md` comme prompt système + la question de l'utilisateur + le contexte du projet
