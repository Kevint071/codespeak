import type { Config } from 'jest'
import nextJest from 'next/jest.js'
 
const createJestConfig = nextJest({
  dir: './',
})
 
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  preset: 'ts-jest',
  moduleNameMapper: {
    // Handle module aliases (if you're using them in your Next.js project)
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(jose|next-auth|@panva|openid-client|preact|@babel|uuid)/)',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
  ],
  reporters: [
    "default",
    [
      "jest-html-reporters",
      {
        pageTitle: "Reportes de Pruebas",
        outputPath: "./reports/test-report.html", // Ruta donde se guardará el reporte
        includeFailureMsg: true,
        includeConsoleLog: true,
      },
    ],
  ],
}
 
export default createJestConfig(config)