import "@babel/polyfill"
import app from './app'

async function main() {
    await app.listen(app.get('port'));
    console.log('Server running on port', app.get('port'));
}

main();