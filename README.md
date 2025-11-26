# 🚀 Projeto PDM — AppCamera (Captura de Foto e Geolocalização)

Este projeto é um aplicativo móvel simples (React Native + Expo) para capturar fotos e registrar geolocalização. A arquitetura adotada é MVVM simplificada (Model / ViewModel / View) para separar responsabilidade e facilitar manutenção.

---

## Estrutura do projeto (src/)
- src/
  - model/
    - entities/
      - Myphotos.ts        — Tipos e contratos (MyPhoto, CameraState, CameraActions)
  - viewmodel/
    - useCameraViewModel.ts — Hook que gerencia estado, permissões e ações da câmera
  - view/
    - AppNavigator.tsx     — Navegação (Native Stack)
    - CameraScreen.tsx     — Tela de pré‑visualização e controles da câmera
    - PhotoListScreen.tsx  — Tela de listagem de fotos

---

## Arquitetura (resumo)
- Model: define tipos e contratos (ex.: MyPhoto, CameraState, CameraActions).
- ViewModel: hook responsável por estado reativo, lógica de captura, permissões e exposição de ações (capturePhoto, toggleCameraFacing, etc.).
- View: componentes que consomem o estado/ações da ViewModel, renderizam UI e lidam com navegação.

---

## Pré-requisitos
- Node.js (versão LTS)
- npm (ou yarn)
- Expo CLI disponível via npx (não é preciso instalar globalmente)

---

## Instalação (Windows — PowerShell)
Abra o terminal na pasta do projeto AppCamera:

```powershell
# 1. Instala dependências do package.json
npm install

# 2. Instala/sincroniza módulos nativos com versões compatíveis com Expo
npx expo install expo-camera expo-location expo-image react-native-uuid react-native-screens react-native-safe-area-context

# (Opcional — se usar react-navigation e ainda não instalou)
npm install @react-navigation/native @react-navigation/native-stack
```

---

## Execução
```powershell
# Inicia servidor do Expo e limpa cache
npx expo start
# ou
npx expo start --tunnel
```
Abra o app Expo Go no dispositivo e escaneie o QR code exibido no terminal.

---

## Permissões
Ao abrir o app serão solicitadas:
- Permissão de Câmera (necessária para captura)
- Permissão de Localização (opcional, necessária para registrar coordenadas)

---