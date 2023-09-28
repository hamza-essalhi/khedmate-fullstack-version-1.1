import bcrypt from "bcrypt";
// Hash a string using bcrypt
async function hashString(inputString) {
  try {
    // Generate a salt with a specified number of rounds (e.g., 10)
    const saltRounds = 11;
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the input string with the generated salt
    const hash = await bcrypt.hash(inputString, salt);

    return hash;
  } catch (error) {
    throw error;
  }
}

// Example usage:
const inputString = 'gR5bmJBUbQhLTZa1';
hashString(inputString)
  .then((hash) => {
    console.log('Hashed String:', hash);
  })
  .catch((error) => {
    console.error('Error:', error);
  });


  const cities = [
    "Casablanca", "Rabat", "Fes", "Marrakesh", "Tangier", "Agadir", "Meknes", "Oujda", "Kenitra", "Tetouan",
    "Safi", "El Jadida", "Nador", "Settat", "Laayoune", "Khouribga", "Beni Mellal", "M'hamid El Ghizlane",
    "Tiznit", "Tan-Tan", "Taza", "Sidi Ifni", "Ouarzazate", "Larache", "Khemisset", "Guelmim", "Berrechid",
    "Taourirt", "Ksar El Kebir", "Chefchaouen", "Al Hoceima", "Azemmour", "Oulad Teima", "Youssoufia", "Bouznika", "Skhirat", "Jerada"
  ];
  
  const domains = [
    "All", "Information Technology", "Finance", "Healthcare", "Marketing", "Education", "Sales", "Engineering",
    "Hospitality", "Media", "Art", "Legal", "Consulting", "Retail", "Human Resources", "Chemistry", "Development"
  ];
  
  const educationLevels = [
    "All", "Uneducated", "College", "Baccalaureate", "Bac +1", "Bac +2", "Bac +3", "Bac +4", "Bac +5", "Bac +6", "Bac +9"
  ];
  
  function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  
  function generateRandomPhoneNumber() {
    const randomNumber = Math.floor(1000000000 + Math.random() * 9000000000);
    return `+212${randomNumber}`;
  }
  
  function generateDummyData(numJobs) {
    const dummyData = [];
  
    for (let i = 0; i < numJobs; i++) {
      const job = {
        userId:'64dfca5ef93fbf236b8c8f85',
ownerFirstName:"Yassine",
ownerLastName:"Essalhi" ,
        title: `Job Title ${i + 1}`,
        domain: getRandomElement(domains),
        experience: [getRandomElement(["Entry Level", "Mid Level", "Senior Level"])],
        city: getRandomElement(cities),
        contactNumber: generateRandomPhoneNumber(),
        jobDescription: `Job Description for Job ${i + 1}`,
        contactEmail: `contact${i + 1}@example.com`,
        type: getRandomElement(["Full-Time", "Part-Time", "Contract", "Freelance"]),
        company: `Company ${i + 1}`,
        educationLevel: getRandomElement(educationLevels),
        salary: Math.floor(20000 + Math.random() * 80000), // Generate a random salary between 20,000 and 100,000
        keywords: ["Keyword1", "Keyword2", "Keyword3"], // Replace with actual keywords
      };
  
      dummyData.push(job);
    }
  
    return dummyData;
  }
  
  const numJobsToGenerate = 10; // Change this to the number of dummy jobs you want to generate
  const dummyJobs = generateDummyData(numJobsToGenerate);
  console.log(dummyJobs);
  