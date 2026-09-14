---
title: 'DEMO: компонент цитаты (Quote)'
headline: 'DEMO: компонент цитаты (Quote)'
date: 2026-09-14T04:00:00.000Z
excerpt: >-
  Тестовый пост, не для публикации — демонстрация нового блочного компонента
  для оформления цитат в статьях.
description: 'Демо-пост с примерами компонента Quote: разные комбинации автора, даты, ссылки и примечания.'
image: /images/common/placeholder.png
imageAlt: 'Заглушка обложки для демо-поста'
tags:
  - demo
categories:
  - dev
author: romkin
---

Этот пост нужен только для того, чтобы посмотреть, как выглядит новый компонент `::Quote` вживую, на разных комбинациях полей. Не публиковать, удалить или разобрать после ревью.

## Все поля сразу

::Quote{author="Дуглас Крокфорд" date="2008" link="https://www.crockford.com/javascript/javascript.html" source="JavaScript: The Good Parts"}
JavaScript — язык с гораздо большим количеством хороших частей, чем принято думать, и с некоторым количеством откровенно опасных.
::

## Только автор

::Quote{author="Роман Палмин"}
Если что-то работает только на моей машине — значит, оно пока не работает.
::

## Автор + дата, без ссылки

::Quote{author="Брендан Айк" date="1995"}
Изначально язык был написан за десять дней.
::

## Только ссылка, без source (fallback на хост)

::Quote{link="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Event_loop"}
Каждый поток выполнения JS имеет собственный event loop, так что коды, вызванные из разных вкладок, действительно выполняются независимо.
::

## Ссылка + source

::Quote{source="WHATWG HTML Standard" link="https://html.spec.whatwg.org/multipage/webappapis.html#event-loops"}
An event loop has one or more task queues, a microtask queue, and other state as described below.
::

## С примечанием (note)

::Quote{author="Из внутреннего code review" date="март 2026" note="Комментарий приведён в сокращении, полная переписка — в приватном канале."}
Тут не race condition, тут просто два разработчика правили один файл одновременно.
::

## Совсем без метаданных (пограничный случай)

::Quote
Иногда цитата важна сама по себе, без указания источника.
::

## Несколько несмежных фрагментов одного источника

Разрыв между кусками цитаты, которые в оригинале идут не подряд (между ними
что-то пропущено), обозначается обычным markdown-разделителем `---` внутри
блока — компонент рисует его не как горизонтальную черту, а как «[…]».

::Quote{author="Из спецификации" source="WHATWG HTML Standard" link="https://html.spec.whatwg.org/multipage/webappapis.html#event-loops"}
Each agent has an associated event loop, and each event loop processes tasks and microtasks.

---

Rendering opportunities are also processed as part of the event loop, but only when there are no more tasks or microtasks left to process.
::

## Многоабзацная цитата

::Quote{author="Тестовый абзац" date="для проверки вертикального ритма"}
Первый абзац цитаты — здесь должен быть нормальный интервал до следующего.

Второй абзац — проверяем, что отступ между параграфами внутри цитаты не съезжает и не сливается с обычным `.prose`-текстом снаружи.
::

Дальше в статье — обычный текст, не в цитате, чтобы видеть контраст со стилем компонента и с дефолтным markdown-blockquote ниже.

> Для сравнения — так выглядит обычный markdown-blockquote (`>`), без нового компонента.
