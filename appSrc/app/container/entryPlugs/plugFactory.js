export const plugGenerator = (plug, plugName) => {
    if(!plug.name) {
        console.error(`Plug should have it's own name!`)
    }

    if(!plug.dummyPlug) {
        // console.error(`This is a empty machine`)
    }

    return plug;
}