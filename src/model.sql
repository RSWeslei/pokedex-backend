CREATE TABLE abilities (
    id serial primary key,
    description varchar(255) not null,
    name varchar(100) NOT NULL unique
);

CREATE TABLE types (
    id serial primary key,
    name varchar(100) NOT NULL unique
);

CREATE TABLE evolution_chains (
    id serial primary key,
    previous_evolution_id integer,
    actual_evolution_id integer,
    next_evolution_id integer
);

CREATE TABLE stats (
    id serial primary key,
    hp numeric(10, 4) NOT NULL,
    attack numeric(10, 4) NOT NULL,
    speed numeric(10, 4) NOT NULL,
    defense numeric(10, 4) NOT NULL,
    special_attack numeric(10, 4),
    special_defense numeric(10, 4)
);

CREATE TABLE pokemons (
    id serial primary key,
    name varchar(100) NOT NULL UNIQUE,
    height numeric(10, 4) NOT NULL,
    weight numeric(10, 4) NOT NULL,
    images JSON NOT NULL,
    id_stat integer NOT NULL,
    CONSTRAINT fk_pokemons_pokemon FOREIGN KEY (evolution_to) REFERENCES pokemons(id),
    CONSTRAINT fk_pokemons_stat FOREIGN KEY (id_stat) REFERENCES stats(id)
);

CREATE TABLE pokemon_abilities (
    id serial primary key,
    id_pokemon integer NOT NULL,
    id_ability integer NOT NULL,
    CONSTRAINT fk_pokemon_abilities_pokemon FOREIGN KEY (id_pokemon) REFERENCES pokemons(id),
    CONSTRAINT fk_pokemon_abilities_ability FOREIGN KEY (id_ability) REFERENCES abilities(id)
);

CREATE TABLE pokemon_types (
    id serial primary key,
    id_pokemon integer NOT NULL,
    id_type integer NOT NULL,
    CONSTRAINT fk_pokemon_types_pokemon FOREIGN KEY (id_pokemon) REFERENCES pokemons(id),
    CONSTRAINT fk_pokemon_types_type FOREIGN KEY (id_type) REFERENCES types(id)
);