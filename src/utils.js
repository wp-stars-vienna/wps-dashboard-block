export const changeDashPage = (setPage, props) => {
    // check if the current url is the base or we need to navigate to a given url
    console.log(window.location.pathname, props.dash_url)
    if(window.location.pathname !== props.dash_url) {
        let newPage
        if(window.location.pathname.includes('/wp_development/dashboard/meine-pakete')) {
            newPage = 'Meine Pakete'
        } else if(window.location.pathname.includes('/wp_development/dashboard/profile')) {
            newPage = 'Mein Profil'
        } else if(window.location.pathname.includes('/wp_development/dashboard/lehrstellen')) {
            newPage = 'Lehrstellen'
        } else if(window.location.pathname.includes('/wp_development/dashboard/firmenprofil')) {
            newPage = 'Firmenprofil'
        } else if(window.location.pathname === '/wp_development/dashboard/' || window.location.pathname === '/wp_development/dashboard') {
            newPage= 'Dashboard'
        } else {
            newPage= 'Dashboard'
        }
        console.log(newPage)
        setPage(newPage)
    }
}


export function get_current_root_url() {
    let full_url = window.location.href
    let root_url_pattern = /(http:\/\/).*?\//i
    let match = full_url.match(root_url_pattern)
    if (match == null) {
        let root_url_pattern = /(https:\/\/).*?\//i
        return full_url.match(root_url_pattern)[0]
    }
    return match[0]
}

export function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr
}

/**
 * Returns an array with given number of chunks arrays.
 * will be evenly spread
 *
 * @param myArray Array array to split
 * @param chunkNumber number of chunks wanted
 */
export function chunkArray(myArray, chunkNumber) {
    let arrayLength = myArray.length;
    let chunkSize = Math.floor(arrayLength / chunkNumber)

    let tempArray = [];

    for (let index = 0; index < arrayLength; index += chunkSize) {
        let myChunk = myArray.slice(index, index + chunkSize);
        // Do something if you want with the group
        tempArray.push(myChunk);
    }

    return tempArray;
}

export function fillUpArray(array, end_length) {
    let arrayLength = array.length
    let wanted_length = Math.max(arrayLength, end_length)
    let numberOfNeededItems = wanted_length - arrayLength

    let availableItems = array.entries()

    for (let i = 0; i < numberOfNeededItems; i++) {
        if (availableItems.done) {
            availableItems = array.entries()
        }

        const nextItem = availableItems.next()

        if (nextItem.value !== undefined) {
            array.push(nextItem.value[1])
        }
    }

    return array
}