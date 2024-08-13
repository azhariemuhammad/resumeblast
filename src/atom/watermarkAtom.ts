import { atom } from 'jotai'
import { WatermarkStyle } from '../types'

export const watermarkAtom = atom<WatermarkStyle>({
    watermarkText: '',
    fontSize: 'md',
    fontColor: '#000000',
    fontFamily: "'Helvetica', sans-serif",
    opacity: 0.3
})
