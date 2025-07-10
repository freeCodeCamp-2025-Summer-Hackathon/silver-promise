--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: question_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.question_type AS ENUM (
    'single',
    'multi',
    'open'
);


ALTER TYPE public.question_type OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: answers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.answers (
    id_answer bigint NOT NULL,
    id_question bigint,
    id_user integer,
    answer text,
    sent_date date
);


ALTER TABLE public.answers OWNER TO postgres;

--
-- Name: answers_id_answer_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.answers_id_answer_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.answers_id_answer_seq OWNER TO postgres;

--
-- Name: answers_id_answer_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.answers_id_answer_seq OWNED BY public.answers.id_answer;


--
-- Name: countries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.countries (
    c_code character varying(2) NOT NULL,
    name character varying(56) NOT NULL
);


ALTER TABLE public.countries OWNER TO postgres;

--
-- Name: important_tags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.important_tags (
    id_tag integer NOT NULL,
    name character varying(25)
);


ALTER TABLE public.important_tags OWNER TO postgres;

--
-- Name: important_tags_id_tag_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.important_tags_id_tag_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.important_tags_id_tag_seq OWNER TO postgres;

--
-- Name: important_tags_id_tag_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.important_tags_id_tag_seq OWNED BY public.important_tags.id_tag;


--
-- Name: poll_links; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.poll_links (
    id_link bigint NOT NULL,
    id_poll bigint,
    slug text,
    created_at timestamp with time zone,
    expires_at timestamp with time zone,
    CONSTRAINT poll_links_check CHECK ((expires_at > created_at))
);


ALTER TABLE public.poll_links OWNER TO postgres;

--
-- Name: poll_links_id_link_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.poll_links_id_link_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.poll_links_id_link_seq OWNER TO postgres;

--
-- Name: poll_links_id_link_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.poll_links_id_link_seq OWNED BY public.poll_links.id_link;


--
-- Name: poll_options; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.poll_options (
    id_option integer NOT NULL,
    id_question bigint,
    option text,
    "position" integer
);


ALTER TABLE public.poll_options OWNER TO postgres;

--
-- Name: poll_options_id_option_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.poll_options_id_option_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.poll_options_id_option_seq OWNER TO postgres;

--
-- Name: poll_options_id_option_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.poll_options_id_option_seq OWNED BY public.poll_options.id_option;


--
-- Name: poll_questions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.poll_questions (
    id_question bigint NOT NULL,
    id_poll bigint,
    question text,
    type public.question_type,
    "position" integer,
    is_required boolean
);


ALTER TABLE public.poll_questions OWNER TO postgres;

--
-- Name: polls; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.polls (
    id_poll bigint NOT NULL,
    author integer,
    title character varying(255) NOT NULL,
    date_start date NOT NULL,
    date_end date NOT NULL,
    is_public boolean,
    CONSTRAINT polls_check CHECK ((date_end > date_start))
);


ALTER TABLE public.polls OWNER TO postgres;

--
-- Name: polls_id_poll_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.polls_id_poll_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.polls_id_poll_seq OWNER TO postgres;

--
-- Name: polls_id_poll_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.polls_id_poll_seq OWNED BY public.polls.id_poll;


--
-- Name: questions_id_question_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.questions_id_question_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.questions_id_question_seq OWNER TO postgres;

--
-- Name: questions_id_question_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.questions_id_question_seq OWNED BY public.poll_questions.id_question;


--
-- Name: user_profiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_profiles (
    id_profile integer NOT NULL,
    bio text,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.user_profiles OWNER TO postgres;

--
-- Name: user_tags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_tags (
    id_profile integer NOT NULL,
    id_tag integer NOT NULL
);


ALTER TABLE public.user_tags OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id_user integer NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(200),
    country character varying(2),
    pass_hash character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    is_active boolean
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_user_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_user_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_user_seq OWNER TO postgres;

--
-- Name: users_id_user_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_user_seq OWNED BY public.users.id_user;


--
-- Name: answers id_answer; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.answers ALTER COLUMN id_answer SET DEFAULT nextval('public.answers_id_answer_seq'::regclass);


--
-- Name: important_tags id_tag; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.important_tags ALTER COLUMN id_tag SET DEFAULT nextval('public.important_tags_id_tag_seq'::regclass);


--
-- Name: poll_links id_link; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.poll_links ALTER COLUMN id_link SET DEFAULT nextval('public.poll_links_id_link_seq'::regclass);


--
-- Name: poll_options id_option; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.poll_options ALTER COLUMN id_option SET DEFAULT nextval('public.poll_options_id_option_seq'::regclass);


--
-- Name: poll_questions id_question; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.poll_questions ALTER COLUMN id_question SET DEFAULT nextval('public.questions_id_question_seq'::regclass);


--
-- Name: polls id_poll; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.polls ALTER COLUMN id_poll SET DEFAULT nextval('public.polls_id_poll_seq'::regclass);


--
-- Name: users id_user; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id_user SET DEFAULT nextval('public.users_id_user_seq'::regclass);


--
-- Data for Name: answers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.answers (id_answer, id_question, id_user, answer, sent_date) FROM stdin;
\.


--
-- Data for Name: countries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.countries (c_code, name) FROM stdin;
AF	Afghanistan
AL	Albania
DZ	Algeria
AD	Andorra
AO	Angola
AI	Anguilla
AQ	Antarctica
AG	Antigua and Barbuda
SA	Saudi Arabia
AR	Argentina
AM	Armenia
AW	Aruba
AU	Australia
AT	Austria
AZ	Azerbaijan
BS	Bahamas
BH	Bahrain
BD	Bangladesh
BB	Barbados
BE	Belgium
BZ	Belize
BJ	Benin
BM	Bermuda
BT	Bhutan
BY	Belarus
BO	Bolivia
BQ	Bonaire, Sint Eustatius and Saba
BA	Bosnia and Herzegovina
BW	Botswana
BR	Brazil
BN	Brunei
IO	British Indian Ocean Territory
VG	British Virgin Islands
BG	Bulgaria
BF	Burkina Faso
BI	Burundi
CL	Chile
CN	China
HR	Croatia
CW	Curaçao
CY	Cyprus
TD	Chad
ME	Montenegro
CZ	Czechia
UM	U.S. Minor Outlying Islands
DK	Denmark
CD	Democratic Republic of the Congo
DM	Dominica
DO	Dominican Republic
DJ	Djibouti
EG	Egypt
EC	Ecuador
ER	Eritrea
EE	Estonia
SZ	Eswatini
ET	Ethiopia
FK	Falkland Islands
FJ	Fiji
PH	Philippines
FI	Finland
FR	France
TF	French Southern Territories
GA	Gabon
GM	Gambia
GS	South Georgia and the South Sandwich Islands
GH	Ghana
GI	Gibraltar
GR	Greece
GD	Grenada
GL	Greenland
GE	Georgia
GU	Guam
GG	Guernsey
GF	French Guiana
GY	Guyana
GP	Guadeloupe
GT	Guatemala
GW	Guinea-Bissau
GQ	Equatorial Guinea
GN	Guinea
HT	Haiti
ES	Spain
NL	Netherlands
HN	Honduras
HK	Hong Kong
IN	India
ID	Indonesia
IQ	Iraq
IR	Iran
IE	Ireland
IS	Iceland
IL	Israel
JM	Jamaica
JP	Japan
YE	Yemen
JE	Jersey
JO	Jordan
KY	Cayman Islands
KH	Cambodia
CM	Cameroon
CA	Canada
QA	Qatar
KZ	Kazakhstan
KE	Kenya
KG	Kyrgyzstan
KI	Kiribati
CO	Colombia
KM	Comoros
CG	Republic of the Congo
KR	South Korea
KP	North Korea
CR	Costa Rica
CU	Cuba
KW	Kuwait
LA	Laos
LS	Lesotho
LB	Lebanon
LR	Liberia
LY	Libya
LI	Liechtenstein
LT	Lithuania
LU	Luxembourg
LV	Latvia
MK	North Macedonia
MG	Madagascar
YT	Mayotte
MO	Macau
MW	Malawi
MV	Maldives
MY	Malaysia
ML	Mali
MT	Malta
MP	Northern Mariana Islands
MA	Morocco
MQ	Martinique
MR	Mauritania
MU	Mauritius
MX	Mexico
FM	Micronesia
MM	Myanmar
MD	Moldova
MC	Monaco
MN	Mongolia
MS	Montserrat
MZ	Mozambique
NA	Namibia
NR	Nauru
NP	Nepal
DE	Germany
NE	Niger
NG	Nigeria
NI	Nicaragua
NU	Niue
NF	Norfolk Island
NO	Norway
NC	New Caledonia
NZ	New Zealand
OM	Oman
PK	Pakistan
PW	Palau
PS	Palestine
PA	Panama
PG	Papua New Guinea
PY	Paraguay
PE	Peru
PN	Pitcairn Islands
PF	French Polynesia
PL	Poland
PR	Puerto Rico
PT	Portugal
ZA	South Africa
CF	Central African Republic
CV	Cape Verde
RE	Réunion
RU	Russia
RO	Romania
RW	Rwanda
EH	Western Sahara
KN	Saint Kitts and Nevis
LC	Saint Lucia
VC	Saint Vincent and the Grenadines
BL	Saint Barthélemy
MF	Saint Martin
PM	Saint Pierre and Miquelon
SV	El Salvador
AS	American Samoa
WS	Samoa
SM	San Marino
SN	Senegal
RS	Serbia
SC	Seychelles
SL	Sierra Leone
SG	Singapore
SX	Sint Maarten
SK	Slovakia
SI	Slovenia
SO	Somalia
LK	Sri Lanka
US	United States
SD	Sudan
SS	South Sudan
SR	Suriname
SJ	Svalbard and Jan Mayen
SY	Syria
CH	Switzerland
SE	Sweden
TJ	Tajikistan
TH	Thailand
TW	Taiwan
TZ	Tanzania
TL	Timor-Leste
TG	Togo
TK	Tokelau
TO	Tonga
TT	Trinidad and Tobago
TN	Tunisia
TR	Turkey
TM	Turkmenistan
TC	Turks and Caicos Islands
TV	Tuvalu
UG	Uganda
UA	Ukraine
UY	Uruguay
UZ	Uzbekistan
VU	Vanuatu
WF	Wallis and Futuna
VA	Vatican City
VE	Venezuela
HU	Hungary
GB	United Kingdom
VN	Vietnam
IT	Italy
CI	Côte d'Ivoire
BV	Bouvet Island
CX	Christmas Island
IM	Isle of Man
SH	Saint Helena, Ascension and Tristan da Cunha
AX	Åland Islands
CK	Cook Islands
VI	U.S. Virgin Islands
HM	Heard Island and McDonald Islands
CC	Cocos (Keeling) Islands
MH	Marshall Islands
FO	Faroe Islands
SB	Solomon Islands
ST	São Tomé and Príncipe
ZM	Zambia
ZW	Zimbabwe
AE	United Arab Emirates
\.


--
-- Data for Name: important_tags; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.important_tags (id_tag, name) FROM stdin;
1	education
2	animal rights
3	equality rights
4	business
5	freedom of speech
6	climate
7	science
8	culture
9	globalisation
10	animal wellbeing
11	nature preservation
12	sports
13	human rights
14	unesco
15	unicef
16	wwf
17	feminism
18	liberalism
19	faith
\.


--
-- Data for Name: poll_links; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.poll_links (id_link, id_poll, slug, created_at, expires_at) FROM stdin;
\.


--
-- Data for Name: poll_options; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.poll_options (id_option, id_question, option, "position") FROM stdin;
\.


--
-- Data for Name: poll_questions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.poll_questions (id_question, id_poll, question, type, "position", is_required) FROM stdin;
\.


--
-- Data for Name: polls; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.polls (id_poll, author, title, date_start, date_end, is_public) FROM stdin;
\.


--
-- Data for Name: user_profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_profiles (id_profile, bio, updated_at) FROM stdin;
1	I am here	2025-07-08 21:33:59.422649+02
2	I like playing Palia	2025-07-08 21:33:59.422649+02
3	I am not here	2025-07-08 21:33:59.422649+02
\.


--
-- Data for Name: user_tags; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_tags (id_profile, id_tag) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id_user, username, email, country, pass_hash, created_at, is_active) FROM stdin;
1	herby	herby.g@gmail.com	NZ	$2b$12$G98vKusqdSvvI4FxRt7QdOOzogG8KO6H.poR4pJWj6exHxkimpKF6	2025-07-08 19:56:11.832507+02	t
2	ramona	ramonadandellion@gmail.com	AT	$2b$12$25VOAi451z9ugk/YbWJiX.h15crvgwmfEBaquNCWn1y7i9dUYcWg6	2025-07-08 19:56:11.832507+02	t
3	motus	motus@gmail.com	CV	$2b$12$WBonTuh8KvKM/m1gB5hJmeVQGDfcm7MsMhcxzj.PHSmN5kJQuN7LG	2025-07-08 19:56:11.832507+02	f
\.


--
-- Name: answers_id_answer_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.answers_id_answer_seq', 1, false);


--
-- Name: important_tags_id_tag_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.important_tags_id_tag_seq', 19, true);


--
-- Name: poll_links_id_link_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.poll_links_id_link_seq', 1, false);


--
-- Name: poll_options_id_option_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.poll_options_id_option_seq', 1, false);


--
-- Name: polls_id_poll_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.polls_id_poll_seq', 1, false);


--
-- Name: questions_id_question_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.questions_id_question_seq', 1, false);


--
-- Name: users_id_user_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_user_seq', 3, true);


--
-- Name: answers answers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.answers
    ADD CONSTRAINT answers_pkey PRIMARY KEY (id_answer);


--
-- Name: countries countries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.countries
    ADD CONSTRAINT countries_pkey PRIMARY KEY (c_code);


--
-- Name: important_tags important_tags_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.important_tags
    ADD CONSTRAINT important_tags_name_key UNIQUE (name);


--
-- Name: important_tags important_tags_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.important_tags
    ADD CONSTRAINT important_tags_pkey PRIMARY KEY (id_tag);


--
-- Name: poll_links poll_links_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.poll_links
    ADD CONSTRAINT poll_links_pkey PRIMARY KEY (id_link);


--
-- Name: poll_options poll_options_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.poll_options
    ADD CONSTRAINT poll_options_pkey PRIMARY KEY (id_option);


--
-- Name: polls polls_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.polls
    ADD CONSTRAINT polls_pkey PRIMARY KEY (id_poll);


--
-- Name: poll_questions questions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.poll_questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (id_question);


--
-- Name: user_profiles user_profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_profiles
    ADD CONSTRAINT user_profiles_pkey PRIMARY KEY (id_profile);


--
-- Name: user_tags user_tags_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_tags
    ADD CONSTRAINT user_tags_pkey PRIMARY KEY (id_profile, id_tag);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id_user);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: users fk_countries; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT fk_countries FOREIGN KEY (country) REFERENCES public.countries(c_code) ON DELETE CASCADE;


--
-- Name: user_tags fk_important_tags; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_tags
    ADD CONSTRAINT fk_important_tags FOREIGN KEY (id_tag) REFERENCES public.important_tags(id_tag) ON DELETE CASCADE;


--
-- Name: answers fk_poll_questions; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.answers
    ADD CONSTRAINT fk_poll_questions FOREIGN KEY (id_question) REFERENCES public.poll_questions(id_question) ON DELETE CASCADE;


--
-- Name: poll_options fk_poll_questions; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.poll_options
    ADD CONSTRAINT fk_poll_questions FOREIGN KEY (id_question) REFERENCES public.poll_questions(id_question) ON DELETE CASCADE;


--
-- Name: poll_questions fk_polls; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.poll_questions
    ADD CONSTRAINT fk_polls FOREIGN KEY (id_poll) REFERENCES public.polls(id_poll) ON DELETE CASCADE;


--
-- Name: poll_links fk_polls; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.poll_links
    ADD CONSTRAINT fk_polls FOREIGN KEY (id_poll) REFERENCES public.polls(id_poll) ON DELETE CASCADE;


--
-- Name: user_tags fk_user_profiles; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_tags
    ADD CONSTRAINT fk_user_profiles FOREIGN KEY (id_profile) REFERENCES public.user_profiles(id_profile) ON DELETE CASCADE;


--
-- Name: user_profiles fk_users; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_profiles
    ADD CONSTRAINT fk_users FOREIGN KEY (id_profile) REFERENCES public.users(id_user) ON DELETE CASCADE;


--
-- Name: polls fk_users; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.polls
    ADD CONSTRAINT fk_users FOREIGN KEY (author) REFERENCES public.users(id_user) ON DELETE CASCADE;


--
-- Name: answers fk_users; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.answers
    ADD CONSTRAINT fk_users FOREIGN KEY (id_user) REFERENCES public.users(id_user) ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

GRANT USAGE ON SCHEMA public TO user_app;
GRANT USAGE ON SCHEMA public TO godmode;


--
-- Name: TABLE answers; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.answers TO user_app;
GRANT INSERT,DELETE,TRUNCATE,UPDATE ON TABLE public.answers TO godmode;


--
-- Name: TABLE countries; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.countries TO user_app;
GRANT INSERT,DELETE,TRUNCATE,UPDATE ON TABLE public.countries TO godmode;


--
-- Name: TABLE important_tags; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.important_tags TO user_app;
GRANT INSERT,DELETE,TRUNCATE,UPDATE ON TABLE public.important_tags TO godmode;


--
-- Name: TABLE poll_links; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.poll_links TO user_app;
GRANT INSERT,DELETE,TRUNCATE,UPDATE ON TABLE public.poll_links TO godmode;


--
-- Name: TABLE poll_options; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.poll_options TO user_app;
GRANT INSERT,DELETE,TRUNCATE,UPDATE ON TABLE public.poll_options TO godmode;


--
-- Name: TABLE poll_questions; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.poll_questions TO user_app;
GRANT INSERT,DELETE,TRUNCATE,UPDATE ON TABLE public.poll_questions TO godmode;


--
-- Name: TABLE polls; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.polls TO user_app;
GRANT INSERT,DELETE,TRUNCATE,UPDATE ON TABLE public.polls TO godmode;


--
-- Name: TABLE user_profiles; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.user_profiles TO user_app;
GRANT INSERT,DELETE,TRUNCATE,UPDATE ON TABLE public.user_profiles TO godmode;


--
-- Name: TABLE user_tags; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.user_tags TO user_app;
GRANT INSERT,DELETE,TRUNCATE,UPDATE ON TABLE public.user_tags TO godmode;


--
-- Name: TABLE users; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.users TO user_app;
GRANT INSERT,DELETE,TRUNCATE,UPDATE ON TABLE public.users TO godmode;


--
-- PostgreSQL database dump complete
--

