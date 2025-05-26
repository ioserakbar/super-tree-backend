import { Clade } from "../models/clades.model";

var allClades: Clade[] = []
var sortedClades: Clade[] = []
var genusIndex = 0;

// Hardcoded since i don't think it will change at all
const idOfRoot = "67fb0e39782e46887ef2c534";

export function CalculateCladeDynamicData(pAllClades: Clade[]) : Clade[]{

    // We need to calculate the following
    // 1 - The total sons of the clade
    // 2 - The tier of the clade 
    // 3 - The cooridantes of the point, these will be polar coordinates defining the angle and the distance.
    //       I think for my method to work we need to order the species first to ensure siblings are next to one another.
    // 4 - To where the arc will bend, left or right

    // With this function we order all the clades, so that the first one in the array is the root of the tree, and the next one in the array it's its son
    // For example, we have this array (also for all examples, we'll be using this array):
    //  [
    //      "Dinosauria",
    //      "Ornisquia",
    //      "Saurisquia",
    //      "Theropoda",
    //      "Triceratops",
    //      "Megalosaurus"
    //  ]    

    // The array orderer would look like this:
    //  [
    //      "Dinosauria",
    //      "Saurisquia",
    //      "Theropoda",
    //      "Megalosaurus",
    //      "Ornisquia",
    //      "Triceratops"
    //  ]    
    // 
    //  Dinosauria s the first one of the array, and the one next to it is the children that has more children itself. Once we finished with the branch of Saurisquia qe then add the branch of Ornisquia
    //

    

    allClades = pAllClades
    genusIndex = 0;

    var rootCladeId = allClades.find(c => c.id == idOfRoot)!.id

    getTotalSonsAndTierOfClades(rootCladeId)
    sortedClades = orderTestData(rootCladeId)
    calculateCoordinates()

    return sortedClades

}

function orderTestData(cladeId: string, sortedClades: Clade[] = []) : Clade[]{

    var clade = allClades.find(c => c.id == cladeId)!
    sortedClades.push(clade)

    //We create an array with the number of the children of the clades children, in other words the grandchildren
    // So for Dinosauria, that has as children Ornisquia and Saurisqia the array would be this: [1, 2]. Since Ornisquia has 1 son and Saurisquia has 2 sons
    var grandChildrenArray: number[] = []
    clade.directSons?.forEach(directSon => {
        grandChildrenArray.push(allClades.find(c => c.id == directSon)!.drawHelper!.totalSons)
    });

    // Now we bubble sort it, the reason why we do this manyally instead of calling the .sort() function is that we need to apply the changes made to the directSons array of the clade.
    // So for Dinosauria, directSons = [ OrnisquiaId, SaurisqiaId ] and grandChildrenArray = [ 1, 2 ]. Sorting grandChildrenArray will send the 2 to the first place of the array, so we need
    // to apply this to directSons as well. The end result is that the order of directSons is dictated by the number of total children of each. The one with the bigger number goes first.
    // End result grandChildrenArray = [ 2, 1 ] , directSons = [ SaurisqiaId, OrnisquiaId ]

    var temp, temp2;
    var swapped;

    for (var i = 0; i < grandChildrenArray.length - 1; i++) {

        swapped = false;

        for (var j = 0; j < grandChildrenArray.length - i - 1; j++) {

            if (grandChildrenArray[j] < grandChildrenArray[j + 1]) {

                //Swap operation for grandChildrenArray
                temp = grandChildrenArray[j];
                grandChildrenArray[j] = grandChildrenArray[j + 1];
                grandChildrenArray[j + 1] = temp;

                //Swap operation for directSons
                temp2 = clade.directSons![j]
                clade.directSons![j] = clade.directSons![j + 1];
                clade.directSons![j + 1] = temp2;

                swapped = true;
            }
        }

        // IF no two elements were 
        // swapped by inner loop, then break
        if (swapped == false)
            break;
    }

    // Setting to true the children caldes that got more sons, if they have siblings
    if (clade.directSons!.length > 1) {
        allClades.find(c => c.id == clade.directSons!.at(-1))!.drawHelper!.arcOrientation = true;

    }

    clade.directSons?.forEach(son => {
        orderTestData(son, sortedClades)
    });

    return sortedClades

}

function getTotalSonsAndTierOfClades(cladeId: String, cladeTier = 0) {

    var clade = allClades.find(c => c.id == cladeId)!;

    var totalSons = clade.directSons!.length;
    clade.directSons!.forEach(son => {
        totalSons = totalSons + getTotalSonsAndTierOfClades(son, cladeTier + 1)
    });

    clade.drawHelper!.totalSons = totalSons
    clade.tier = cladeTier

    return totalSons;
}

function calculateCoordinates() {

    var firstCladeId = sortedClades.find(c => c.id == idOfRoot)!.id
    var totalSpecies = sortedClades.filter(c => c.directSons?.length == 0).length
    var cladeWidth = 360 / totalSpecies;

    getCoordinatesOfClade(firstCladeId, cladeWidth)

    genusIndex = 0;

}

function getCoordinatesOfClade(cladeId: string, cladeWidth: number) {

    var clade = sortedClades.find(c => c.id == cladeId)!

    //    To calcualte this we need the coordinates of the sons, sine this is a recursive funcion, we will first detect if we are in the tip
    // of the branch or in any other part ,to do this we get the direct sons of the clade

    if (clade.directSons?.length == 0) { // Tip of the branch
        var angle = cladeWidth * genusIndex
        clade.drawHelper!.coords.angle = angle
        clade.drawHelper!.coords.distance = 400
        genusIndex++

    } else {

        clade.directSons?.forEach(son => {
            getCoordinatesOfClade(son, cladeWidth)
        });

        if (clade.directSons?.length == 1) {


            clade.drawHelper!.coords.angle = sortedClades.find(c => c.id == clade.directSons![0])!.drawHelper!.coords.angle;
            clade.drawHelper!.coords.distance = clade.tier! * 100;
            
        }
        else {

            //We get the sumatory of the sons and divide them by to to get the middle point
            var middlePointX = 0
            var middlePointY = 0

            clade.directSons!.forEach(son => {
                var sonClade = sortedClades.find(c => c.id == son)!


                var coordinates = getCardinalFromPolarCoordinates(sonClade.drawHelper!.coords)

                middlePointX = middlePointX + coordinates.x
                middlePointY = middlePointY + coordinates.y

            })


            middlePointX = middlePointX / 2
            middlePointY = middlePointY / 2

            //Then we get the angle of said point, relative to the center (0, 0).
            var angle = Math.atan(middlePointY / middlePointX)

            //Since it's in radians, we need to convert it to degrees
            angle = angle * (180 / Math.PI)

            // Lastly we adjuste the angle depending on the cuadrant the point resides in
            if (middlePointX < 0) { // 2nd and 3rd cuadrant

                angle = angle + 180

            } else if (middlePointX > 0 && middlePointY < 0) { //4th cuadrant

                angle = angle + 360
            }

            clade.drawHelper!.coords.angle = angle;
            clade.drawHelper!.coords.distance = clade.tier! * 100;            
        }
    }
}

function getCardinalFromPolarCoordinates(coords: { angle: number, distance: number }) {

    var angle = coords.angle * (Math.PI / 180) //From degrees to radians

    var x = coords.distance * Math.cos(angle)
    var y = coords.distance * Math.sin(angle)

    return { x: x, y: y }
}