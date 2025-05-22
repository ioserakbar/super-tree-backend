import {v4 as uuidv4} from 'uuid';
import { Species } from './models/species.model';
import { Clade } from './models/clades.model';

var tricerId = 'db0c2d5d-a678-47d1-8e2b-ca07dbc9de67'
var trexId = '5d4eaf71-7382-4120-baf8-a27063e41929'
var diplodocusId = '7a1e0386-f4ba-4892-a78f-c154e932d0e5'
var megaloId = '1d0bece2-4120-4892-a78f-ca07dbc9de67'

var tricerSpeciesId = '509410cf-b52b-4dc1-a777-6e35e2ffc01f'

export const sample_Species: Species[] = [
    {
        id: tricerSpeciesId, 
        binomialNomenclature:  "Triceratops horridus", 
        genus: tricerId
    },
    {
        id: uuidv4(), 
        binomialNomenclature:  "Tyrannosaurus rex", 
        genus: trexId
    },
    {
        id: uuidv4(), 
        binomialNomenclature:  "Diplodocus longus", 
        genus: diplodocusId
    },
    {
        id: uuidv4(), 
        binomialNomenclature:  "Megalosaurus bucklandii", 
        genus: megaloId
    },
]


export const sapmle_Clades: any[] = [
    {
        drawHelper: { coords: {angle: 0, distance: 0}, totalSons: 10, arcOrientation: false },
        _id: '67fb0e39782e46887ef2c534',
        name: 'Dinosauria',
        parentClade: 'e59cd26a-27ca-4f0a-b15c-f3ab6dca2bfc',
        description: '',
        isFirst: true,
        tier: 0,
        directSons: [ '67fb0e39782e46887ef2c537', '67fb0e39782e46887ef2c535' ],
        createdAt: '2025-04-13T01:07:05.840Z',
        updatedAt: '2025-04-13T01:07:05.840Z',
        __v: 0,
        id: '67fb0e39782e46887ef2c534'
      },
      {
        drawHelper: { coords: {angle: 90, distance: 100}, totalSons: 1, arcOrientation: true },
        _id: '67fb0e39782e46887ef2c535',
        name: 'Ornithischia',
        parentClade: '563f16e2-1ad7-4aa2-a902-a38a168489d0',
        isFirst: false,
        tier: 1,
        directSons: [ '67fb0e39782e46887ef2c536' ],
        createdAt: '2025-04-13T01:07:05.840Z',
        updatedAt: '2025-04-13T01:07:05.840Z',
        __v: 0,
        id: '67fb0e39782e46887ef2c535'
      },
      {
        drawHelper: { coords: {angle: 225, distance: 200}, totalSons: 4, arcOrientation: false },
        _id: '67fb0e39782e46887ef2c538',
        name: 'Theropoda',
        parentClade: 'd3874820-6d12-4e47-abec-ecaf14bfaed4',
        isFirst: false,
        tier: 2,
        directSons: [ '67fb0e39782e46887ef2c539', '67fb0e39782e46887ef2c53b' ],
        createdAt: '2025-04-13T01:07:05.840Z',
        updatedAt: '2025-04-13T01:07:05.840Z',
        __v: 0,
        id: '67fb0e39782e46887ef2c538'
      },
      {
        drawHelper: { coords: {angle: 180, distance: 300}, totalSons: 1, arcOrientation: false },
        _id: '67fb0e39782e46887ef2c539',
        name: 'Megalosauroidea',
        parentClade: '1d0bece2-3951-46f0-9d8f-c4d58ca36da4',
        isFirst: false,
        tier: 3,
        directSons: [ '67fb0e39782e46887ef2c53a' ],
        createdAt: '2025-04-13T01:07:05.840Z',
        updatedAt: '2025-04-13T01:07:05.840Z',
        __v: 0,
        id: '67fb0e39782e46887ef2c539'
      },
      {
        drawHelper: { coords: {angle: 180, distance: 400}, totalSons: 0, arcOrientation: true },
        _id: '67fb0e39782e46887ef2c53a',
        name: 'Megalosaurus',
        parentClade: '57dc9a94-47bc-451a-8e99-25b5245714d7',
        isFirst: false,
        tier: 4,
        directSons: [],
        createdAt: '2025-04-13T01:07:05.840Z',
        updatedAt: '2025-04-13T01:07:05.840Z',
        __v: 0,
        id: '67fb0e39782e46887ef2c53a'
      },
      {
        drawHelper: { coords: {angle: 270, distance: 300}, totalSons: 1, arcOrientation: true },
        _id: '67fb0e39782e46887ef2c53b',
        name: 'Coelurosauria',
        parentClade: '1d0bece2-3951-46f0-9d8f-c4d58ca36da4',
        isFirst: false,
        tier: 3,
        directSons: [ '67fb0e39782e46887ef2c53c' ],
        createdAt: '2025-04-13T01:07:05.840Z',
        updatedAt: '2025-04-13T01:07:05.840Z',
        __v: 0,
        id: '67fb0e39782e46887ef2c53b'
      },
      {
        drawHelper: { coords: {angle: 270, distance: 400}, totalSons: 0, arcOrientation: false },
        _id: '67fb0e39782e46887ef2c53c',
        name: 'Tyrannosaurus',
        parentClade: '0754d3e5-e855-4126-8c22-61640ae8b7c6',
        isFirst: false,
        tier: 4,
        directSons: [],
        createdAt: '2025-04-13T01:07:05.840Z',
        updatedAt: '2025-04-13T01:07:05.840Z',
        __v: 0,
        id: '67fb0e39782e46887ef2c53c'
      },
      {
        drawHelper: { coords: {angle: 0, distance: 200}, totalSons: 1, arcOrientation: true },
        _id: '67fb0e39782e46887ef2c53d',
        name: 'Sauropodomorpha',
        parentClade: 'd3874820-6d12-4e47-abec-ecaf14bfaed4',
        isFirst: false,
        tier: 2,
        directSons: [ '67fb0e39782e46887ef2c53e' ],
        createdAt: '2025-04-13T01:07:05.841Z',
        updatedAt: '2025-04-13T01:07:05.841Z',
        __v: 0,
        id: '67fb0e39782e46887ef2c53d'
      },
      {
        drawHelper: { coords: {angle: 0, distance: 400}, totalSons: 0, arcOrientation: false },
        _id: '67fb0e39782e46887ef2c53e',
        name: 'Diplodocus',
        parentClade: 'dec43eeb-447d-41b5-ab9f-3c9cbbd33dd7',
        isFirst: false,
        tier: 3,
        directSons: [],
        createdAt: '2025-04-13T01:07:05.841Z',
        updatedAt: '2025-04-13T01:07:05.841Z',
        __v: 0,
        id: '67fb0e39782e46887ef2c53e'
      },
      {
        drawHelper: { coords: {angle: 270, distance: 100}, totalSons: 7, arcOrientation: false },
        _id: '67fb0e39782e46887ef2c537',
        name: 'Saurischia',
        parentClade: '563f16e2-1ad7-4aa2-a902-a38a168489d0',
        isFirst: false,
        tier: 1,
        directSons: [ '67fb0e39782e46887ef2c538', '67fb0e39782e46887ef2c53d' ],
        createdAt: '2025-04-13T01:07:05.840Z',
        updatedAt: '2025-04-13T01:07:05.840Z',
        __v: 0,
        id: '67fb0e39782e46887ef2c537'
      },
      {
        drawHelper: { coords: {angle: 90, distance: 400}, totalSons: 0, arcOrientation: false },
        _id: '67fb0e39782e46887ef2c536',
        name: 'Triceratops',
        parentClade: 'f8da3f3c-f85f-4edf-be6f-2977451fa2e6',
        isFirst: false,
        tier: 2,
        directSons: [],
        createdAt: '2025-04-13T01:07:05.840Z',
        updatedAt: '2025-04-13T01:07:05.840Z',
        __v: 0,
        id: '67fb0e39782e46887ef2c536'
      }
    
]