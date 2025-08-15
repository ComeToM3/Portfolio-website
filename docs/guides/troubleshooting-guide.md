# 🔧 Guide de Dépannage - HORDEARII.CA

## 🚨 Erreurs TypeScript Courantes et Solutions

### 1. Erreurs d'imports non utilisés (TS6133)

**Problème :** `'variable' is declared but its value is never read.`

**Solutions :**
```typescript
// ❌ Incorrect
import { generalLimiter, authLimiter, contactLimiter, apiLimiter } from './middleware/rateLimit';

// ✅ Correct - Importer seulement ce qui est utilisé
import { generalLimiter } from './middleware/rateLimit';
```

### 2. Paramètres de fonction non utilisés (TS6133)

**Problème :** `'req' is declared but its value is never read.`

**Solutions :**
```typescript
// ❌ Incorrect
export const customSecurityHeaders = (req: Request, res: Response, next: NextFunction) => {

// ✅ Correct - Préfixer avec underscore
export const customSecurityHeaders = (_req: Request, res: Response, next: NextFunction) => {
```

### 3. Chemins de retour manquants (TS7030)

**Problème :** `Not all code paths return a value.`

**Solutions :**
```typescript
// ❌ Incorrect
export const blockSuspiciousRequests = (req: Request, res: Response, next: NextFunction) => {
  if (condition) {
    return res.status(403).json({ error: 'Blocked' });
  }
  next(); // Pas de return
};

// ✅ Correct - Toujours retourner
export const blockSuspiciousRequests = (req: Request, res: Response, next: NextFunction) => {
  if (condition) {
    return res.status(403).json({ error: 'Blocked' });
  }
  return next(); // Avec return
};
```

### 4. Propriétés inexistantes sur les types (TS2339)

**Problème :** `Property 'path' does not exist on type 'ValidationError'.`

**Solutions :**
```typescript
// ❌ Incorrect
details: errors.array().map(error => ({
  field: error.path, // Propriété inexistante
  message: error.msg,
  value: error.value // Propriété inexistante
}))

// ✅ Correct - Utiliser les propriétés disponibles
details: errors.array().map(error => ({
  field: error.type,
  message: error.msg
}))
```

### 5. Erreurs express-rate-limit IPv6

**Problème :** `Custom keyGenerator appears to use request IP without calling the ipKeyGenerator helper function for IPv6 addresses.`

**Solutions :**
```typescript
// ❌ Incorrect - keyGenerator personnalisé avec req.ip
keyGenerator: (req) => {
  return req.ip + ':' + (req.body?.email || 'unknown');
}

// ✅ Correct - Supprimer le keyGenerator personnalisé
// Laisser express-rate-limit gérer automatiquement les IPs
```

## 🔧 Configuration TypeScript Strict

### tsconfig.json Recommandé
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## 🚀 Bonnes Pratiques

### 1. Imports
- Importer seulement ce qui est utilisé
- Utiliser des imports nommés plutôt que par défaut
- Éviter les imports circulaires

### 2. Paramètres de fonction
- Préfixer avec `_` les paramètres non utilisés
- Toujours retourner une valeur dans les middlewares
- Utiliser `return next()` au lieu de `next()`

### 3. Types
- Éviter `any`, utiliser `unknown` ou types spécifiques
- Utiliser les interfaces pour les objets
- Typer les props des composants

### 4. Validation
- Utiliser les propriétés correctes des objets d'erreur
- Vérifier la documentation des bibliothèques
- Tester les types avec `typeof` et `instanceof`

## 📋 Checklist de Vérification

Avant de commiter :
- [ ] `npm run type-check` passe sans erreurs
- [ ] `npm run lint` passe sans erreurs
- [ ] Tous les imports sont utilisés
- [ ] Tous les paramètres sont utilisés ou préfixés avec `_`
- [ ] Tous les chemins de retour sont corrects
- [ ] Les types correspondent aux propriétés réelles

## 🔗 Ressources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Express Rate Limit Documentation](https://express-rate-limit.github.io/)
- [Express Validator Documentation](https://express-validator.github.io/)
