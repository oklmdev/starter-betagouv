import { DemandeState, handleEvent } from './Demande'
import { makeDemandeAcceptée, makeDemandeDéposée } from './events'

const demandeId = ""

const initialState: DemandeState = {
  demandeId,
  status: 'nouvelle'
}

describe('Demande', () => {

  describe('quand il reçoit un événement DemandeAcceptée', () => {
    it('doit retourner un status accepté', () => {
      expect(handleEvent(initialState, makeDemandeAcceptée({ demandeId, acceptéeLe: 123, acceptéePar: "" }))).toEqual({
        demandeId,
        status: 'acceptée'
      })
    })
  })

  describe('quand il reçoit un événement DemandeDéposée', () => {
    it('doit retourner un status déposée', () => {
      expect(handleEvent(initialState, makeDemandeDéposée({ demandeId, type: 'réclamation', justification: '', déposéeLe: 123, déposéePar: "" }))).toEqual({
        demandeId,
        status: 'déposée'
      })
    })
  })
})