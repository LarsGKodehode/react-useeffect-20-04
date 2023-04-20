import { useEffect, useState } from "react"

/**
 * Å håndtere alt som kan skje i et program er ikke enkelt
 * og krever lesing av dokumentasjonen for hvordan de
 * forskjellige funksjonen du benytter fungerer.
 * 
 * Hvilken feilmeldinger du skal bruke er og et tema:
 * 
 * For frontend applikasjoner så er det i hovedsak
 * feilmelding for slutt brukeren og informasjon
 * til utviklere for hvordan denne funksjonen skal brukes.
 * 
 * I backend så har vi i tillegg et
 * spørsmål om hva vi ønsker å informere om.
 * ie. Vil du informere om at mail adressen
 * eksisterer, men passordet var feil?
 */


/**
 * FetchAPI implementasjon
 * Her håndterer vi de 3 mulige feilene som
 * vi identifiserte.
 */
async function fetchAsync(url) {
    // #1 Har vi tilgang til internett?
    const response = await fetch(url)
        .catch(() => {throw new Error("Network error, or malformed URL")})

    // #2 Responderte serveren med et svar eller en feilkode?
    if (!response.ok) {
        throw new Error("Server responded with code: " + response.status)
    }
    /**
     * Notat for ^denne^, Chrome logger 4xx-5xx svar som feil i consolen
     * uavhengig av hva vi gjør her
     */

    // #3 klarer vi å lese svaret?
    const data = await response.json()
        .catch(() => {throw new Error("Could not parse response object")})

    // Yes! Alt gikk greit!
    return data
}

/**
 * A custom hook for fetching data
 */
export function usePokemonData(url) {
    const [isLoading, setIsLoading] = useState(true)
    const [pokemon, setPokemon] = useState(null)
    const [error, setError] = useState(false)

    useEffect(
        () => {
            fetchAsync(url)
                .then((data) => setPokemon(data))
                .catch((error) => setError(error.message))
                .finally(() => setIsLoading(false))
        },
        [] // Husk å legge til denne for å ikke kjøre funksjonen på nytt når state updateres
    )

    return {
        isLoading,
        pokemon,
        error
    }
}