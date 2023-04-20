import { useEffect, useState } from "react"

import styles from './Timer.module.css'

/**
 * Eksempel funksjon som viser bruken av useEffect
 * for håndtering av asynkron kode
 */
export function Timer() {
  const [time, setTime] = useState(0)

  // useEffect tar i mot 2 argumenter
  // #1: En funksjon, noter deg at den og kan returnerer en 'cleanup' funksjon
  // #2: En liste (Array) som sjekkes for endringer
  useEffect(
    () => {
      const id = setInterval(
        () => setTime(previousTime => previousTime + 1),
        10
      )
      
      // Cleanup funksjonen, prøv selv å se hva som skjer viss vi ikke returnerer noe her
      return () => clearInterval(id)
    },
    // Avhengighets listen, en tom liste sørger for at ^funksjonen^ kun kjøres en gang
    // Viss du gir den variabler vil den sjekke mot forrige tilstand og
    // kun kjøre den når det har skjedd endringer
    []
  )

  return (
    <div className={styles.timer} >
      <h1>{format(time)}</h1>
    </div>
  )
}


// Det er fullt mulig å lage hjelpe funksjoner med JavaScript som dere har lært
// Viss du gjør det samle de gjerne i en egen fil/mappe og eksporter de
// Vanlig navn på en slik mappe er 'utils'/'utilities'
function format(time) {
  return `${(time / 6000).toFixed(0)}m : ${(time / 100).toFixed(0)}s : ${(time % 100)}ms`
}