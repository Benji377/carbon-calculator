export function AboutView() {
  return (
    <div class="p-4 max-w-2xl mx-auto">
      <div class="mb-8">
        <h2 class="text-3xl font-bold mb-4 text-green-700">Carbon Calculator</h2>
        <p class="text-gray-700 text-lg mb-4">
          An open-source web application that helps organizations calculate and track their carbon dioxide (CO₂) emissions. 
          The app allows you to manually add consumptions in a modular way and get a calculated CO₂ emissions footprint.
        </p>
        <p class="text-gray-600">
          This project is designed to be simple, modular, and easy to maintain while providing visual insights into your organization's environmental impact.
        </p>
      </div>

      <div class="mb-8 bg-white p-6 rounded-lg border border-gray-200">
        <h3 class="text-xl font-bold mb-4 text-gray-900">Features</h3>
        <ul class="space-y-2 text-gray-700">
          <li class="flex items-start gap-2">
            <span class="text-green-600 font-bold">✓</span>
            <span>Track multiple organizations</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-green-600 font-bold">✓</span>
            <span>Add modular consumption data</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-green-600 font-bold">✓</span>
            <span>Calculate CO₂ emissions based on country factors</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-green-600 font-bold">✓</span>
            <span>Compare emissions between organizations</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-green-600 font-bold">✓</span>
            <span>Multi-language support (English, German, Italian, Spanish, Swedish)</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-green-600 font-bold">✓</span>
            <span>Offline-first Progressive Web App (PWA)</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-green-600 font-bold">✓</span>
            <span>Export and import data</span>
          </li>
        </ul>
      </div>

      <div class="mb-8 bg-white p-6 rounded-lg border border-gray-200">
        <h3 class="text-xl font-bold mb-4 text-gray-900">Contributors</h3>
        <p class="text-gray-600 mb-4">This project was developed as part of the Erasmus+ program.</p>
        <p class="text-gray-600">
          We acknowledge the contribution of all developers, designers, and stakeholders who made this project possible.
        </p>
      </div>

      <div class="bg-white p-6 rounded-lg border border-gray-200 text-center">
        <h3 class="text-lg font-bold mb-4 text-gray-900">Supported by</h3>
        <img 
          src="/erasmus_logo.jpg" 
          alt="Erasmus+ Logo" 
          class="h-20 mx-auto"
        />
      </div>
    </div>
  );
}
