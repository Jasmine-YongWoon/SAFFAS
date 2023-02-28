import items from './items.js'

// 3D Animation
// Create a new scene
const scene = new THREE.Scene();

// Create a new camera
const camera = new THREE.PerspectiveCamera(15,2);
camera.position.z = 8;

// Create a new renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(120, 60);
//document.body.appendChild(renderer.domElement);
document.getElementById("ase-logo").append(renderer.domElement);

// Create a new sphere mesh for the atom
const atomGeometry = new THREE.SphereGeometry(1, 16, 8);
const atomMaterial = new THREE.MeshBasicMaterial({
  color: 0xf0c420,
  wireframe: true,
});
const atom = new THREE.Mesh(atomGeometry, atomMaterial);
scene.add(atom);

// Create an animation loop
function animate() {
  requestAnimationFrame(animate);
  atom.rotation.x += 0.01;
  atom.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();

// Time Zone
const daysOfWeek = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
function realTime() {
  let koreaTime = new Date().toLocaleString("ko-KR", {timeZone: "Asia/Seoul"});
  let austinTime = new Date().toLocaleString("en-US", {timeZone: "America/Chicago"})
  let koreaDayOfWeek = daysOfWeek[new Date().getDay()];
  let austinDayOfWeek = new Date().toLocaleString("en-US", {weekday: "long", timeZone: "America/Chicago"})
  document.getElementById("koreaTime").innerHTML = koreaDayOfWeek + ", " + koreaTime;
  document.getElementById("austinTime").innerHTML = "Austin: " + austinDayOfWeek + ", " + austinTime;
}
setInterval(realTime, 1000);

// Main Items
const itemsEl = document.querySelector('main .items')
items.forEach(function (nav) {
  const mapEl = document.createElement('div')
  mapEl.classList.add('map')

  let mapList = ''
  nav.maps.forEach(function (map) {
    mapList += /* html */ `<li>
      <a href="${map.url}">${map.name}</a>
    </li>`
  })

  mapEl.innerHTML = /* html */`
  <h3>
    <span class="text">${nav.title}</span>
  </h3>
  <ul>
    ${mapList}
  </ul>
  `
  itemsEl.append(mapEl)
})

// Footer 올해 연도를 적용!
const thisYearEl = document.querySelector('.this-year')
thisYearEl.textContent = new Date().getFullYear()