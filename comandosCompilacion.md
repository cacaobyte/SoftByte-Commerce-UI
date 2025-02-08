rm -rf node_modules bun.lockb package-lock.json ##Eliminar node_module
bun install --no-frozen-lockfile
npm i
git add bun.lockb package-lock.json
git commit -m "Regenerando lockfile para Cloudflare Pages"
git push origin develop  # O la rama en la que estás trabajando
