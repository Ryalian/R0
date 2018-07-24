export const appGenerator = (app, appName) => {
    console.log(app.name)
    if(!app.name) {
        console.error(`App should have it's own name!`)
    }

    if(!app.dummyPlug) {
        console.error(`This is a empty machine`)
    }

    return app;
}