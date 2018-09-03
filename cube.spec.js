import { Cube } from './cube'

describe('Cube', () => {
  describe('rotation', () => {
    it('should rotate right', () => {
      const cube = new Cube({})

      cube.rotateRight()

      expect(cube.currentFace).toEqual(3)
    })

    it('should get back to front face', () => {
      const cube = new Cube({})

      cube.rotateRight()
      cube.rotateRight()
      cube.rotateRight()
      cube.rotateRight()

      expect(cube.currentFace).toEqual(0)
    })

    it('should rotate left', () => {
      const cube = new Cube({})

      cube.rotateLeft()

      expect(cube.currentFace).toEqual(1)
    })

    it('should get back to front face', () => {
      const cube = new Cube({})

      cube.rotateLeft()
      cube.rotateLeft()
      cube.rotateLeft()
      cube.rotateLeft()

      expect(cube.currentFace).toEqual(0)
    })

    it('should return on front face after a rotation to the right', () => {
      const cube = new Cube({})

      cube.rotateRight()
      cube.rotateLeft()

      expect(cube.currentFace).toEqual(0)
    })

    it('should return on front face after a rotation to the left', () => {
      const cube = new Cube({})

      cube.rotateLeft()
      cube.rotateRight()

      expect(cube.currentFace).toEqual(0)
    })
  })

  describe('children', () => {
    it('should add an element to children', () => {
      const cube = new Cube({})
      const child = new Cube({})

      cube.attachTo(child)

      expect(cube.children.pop()).toEqual(child)
    })

    it('should add face on element attached to something', () => {
      const cube = new Cube({})
      const child = new Cube({})

      cube.attachTo(child, 0)

      expect(cube.children.pop().face).toEqual(0)
    })

    it('should hide child when currentFace is the one it is attached to', () => {
      const cube = new Cube({})
      const child = new Cube({})

      cube.attachTo(child, 2)

      expect(cube.isChildHidden(cube.children.pop())).toEqual(true)
    })

    it('should hide child when previousHiddenFace is the one it were attached to', () => {
      const cube = new Cube({})
      const child = new Cube({})

      cube.attachTo(child, 3)

      cube.rotateLeft()

      expect(cube.isChildHidden(cube.children.pop())).toEqual(true)
    })
  })

  describe('hidden face', () => {
    it('should return back when current face is front', () => {
      const cube = new Cube({})

      expect(cube.getHiddenFace()).toEqual(2)
    })

    it('should return right when current face is left', () => {
      const cube = new Cube({})

      cube.rotateRight()

      expect(cube.getHiddenFace()).toEqual(1)
    })

    it('should return front when current face is back', () => {
      const cube = new Cube({})

      cube.rotateRight()
      cube.rotateRight()

      expect(cube.getHiddenFace()).toEqual(0)
    })

    it('should return left when current face is right', () => {
      const cube = new Cube({})

      cube.rotateRight()
      cube.rotateRight()
      cube.rotateRight()

      expect(cube.getHiddenFace()).toEqual(3)
    })
  })
})
