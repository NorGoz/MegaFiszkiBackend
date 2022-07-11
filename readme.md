## Fiszki Backend

Mój osobisty projekt na zakończenie rocznego kursu backendowego MegaK

---

Fiszki Backend is the webserver for Fiszki Project.

## Technologies

---
Project is created with:
* express.js
* Typescript

## Setup
Proszę o utworzęnie bazy danych przed uruchomieniem backendu.

```
Baza danych: `flash_card`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `words`
--

CREATE TABLE `words` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT uuid(),
  `polish` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `english` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember` tinyint(1) DEFAULT 0,
  `create` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `words`
--

INSERT INTO `words` (`id`, `polish`, `english`, `category`, `remember`, `create`) VALUES
('588f5a20-a4a3-4460-9855-158962899879', 'pies', 'dog', 'user', 0, '2022-07-05 22:34:29'),
('7b0c7c49-5461-4b96-89d5-60d8b092904d', 'MegaK2', 'MegaKEnglish', 'test', 0, '2022-06-27 21:14:48'),
('7e44e54b-86e1-4f8b-a840-6bbce015e2f7', 'tataPl1Edytowany2', 'fatherPl1Edit2', 'user', 0, '2022-07-06 19:54:13'),
('db6d27cf-9174-11ec-ab3f-04d4c4e0c0ed', 'test', 'test', 'test', 0, '2022-02-19 12:12:42'),
('e80dbcb9-9174-11ec-ab3f-04d4c4e0c0ed', 'user', 'user', 'user', 0, '2022-07-06 19:54:33');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `words`
--
ALTER TABLE `words`
  ADD PRIMARY KEY (`id`);
COMMIT;

```

---
To run this project, install it locally using npm:
```
$ npm install
$ npm start
```
