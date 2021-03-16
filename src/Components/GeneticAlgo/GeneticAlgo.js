// 交叉
// Creates new DNA sequence from two (this &
function crossover(dad, mom) {
    let childDNA = new Array(dad.length);
    let crossover = Math.floor(Math.random() * dad.length);
    for (let idx = 0; idx < dad.length; idx++) {
        if (idx > crossover) {
            childDNA[idx] = dad[idx];
        } else {
            childDNA[idx] = mom[idx];
        }
    }
    return childDNA;
}



// 变异
// Based on a mutation probability, picks a new random character in array spots
function mutate(DNA, mutationRate) {
    for (let idx = 0; idx < DNA.length; idx++) {
        if (Math.random() < mutationRate) {
            DNA[idx] = Math.random();
        }
    }
    return DNA;
}



// 选择生成matingPool
export function genMatingPool(populationList, maxFitness, fitnessList) {
    // Clear the ArrayList
    let matingPool = [];

    // Calculate total fitness of whole population
    // let maxFitness = Math.max(...fitnessList);

    //计算种群中每个成员的适应度（缩放为0到1之间的值）
    //根据适合度，每个成员都会被添加到交配池中一定次数
    //较高的适应性=交配池中的条目更多=更有可能被选为父级
    //较低的适应性=交配池中的条目较少=不太可能被选为父级
    for (let idx = 0; idx < populationList.length; idx++) {
        // 把适应度归一化到01区间
        let n = Math.floor( (fitnessList[idx]  * 100) / (maxFitness) );
        for (let j = 0; j < n; j ++) {
            matingPool.push(populationList[idx]);
        }
    }
    // populationObj.matingPool = matingPool;
    return matingPool;
}



// Making the next generation
export function reproduction(population, matingPool, mutationRate) {
    let newPopulationList = [];
    // Refill the population with children from the mating pool
    for (let idx = 0; idx < population.length; idx++) {
        // Sping the wheel of fortune to pick two parents
        let m = Math.floor(Math.random() * matingPool.length);
        let d = Math.floor(Math.random() * matingPool.length);
        // Pick two parents
        let momDNA = matingPool[m];
        let dadDNA = matingPool[d];
        // // Get their genes
        // let momgenes = mom.dna;
        // let dadgenes = dad.dna;
        // Mate their genes
        // let child = mutate(crossover(dadDNA, momDNA), mutationRate);
        // Mutate their genes
        // Fill the new population with the new child
        newPopulationList.push(mutate(crossover(dadDNA, momDNA), mutationRate));
    }
    return newPopulationList;
}