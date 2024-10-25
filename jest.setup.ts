// jest.setup.js
import '@testing-library/jest-dom'

// Configuración mock para next/auth si lo estás usando
jest.mock("next-auth", () => ({
  getServerSession: jest.fn(() => null),
}));

jest.mock("next-auth/next", () => ({
  getServerSession: jest.fn(() => null),
}));

// Si necesitas mockear useSession
jest.mock("next-auth/react", () => ({
  useSession: jest.fn(() => ({ data: null, status: "unauthenticated" })),
}));
