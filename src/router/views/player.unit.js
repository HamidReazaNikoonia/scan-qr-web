import Player from './player'

describe('@views/player', () => {
  it('is a valid view', () => {
    expect(Player).toBeAViewComponent()
  })
})
