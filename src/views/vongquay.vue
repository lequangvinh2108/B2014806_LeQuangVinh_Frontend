<template>
  <div class="wheel-container">
    <h2>Vòng Quay May Mắn</h2>
    <div class="wheel" :style="{ transform: 'rotate(' + rotation + 'deg)' }">
      <div
        class="slice"
        v-for="(item, index) in 5"
        :key="index"
        :style="getSliceStyle(index)"
      >
        <span>{{ displayedItems[index] || "?" }}</span>
      </div>
    </div>
    <div class="arrow">▼</div>
    <button @click="spin" :disabled="spinning || aUsed">Quay!</button>
    <p v-if="result">
      🎯 Kết quả: <strong>{{ result }}</strong>
    </p>
    <p v-if="aUsed" class="notice">
      🔒 Ô A đã xuất hiện và sẽ không quay lại nữa.
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      result: null,
      spinning: false,
      rotation: 0,
      aUsed: false,
      pool: [],
      displayedItems: [],
      ECount: 20, // tuỳ chỉnh số lần xuất hiện của E
    };
  },
  mounted() {
    this.initPool();
    this.generateDisplay();
  },
  methods: {
    initPool() {
      this.pool = [
        "A",
        ...Array(3).fill("B"),
        ...Array(5).fill("C"),
        ...Array(100).fill("D"),
        ...Array(this.ECount).fill("E"),
      ];
    },
    generateDisplay() {
      // chọn 5 item ngẫu nhiên để hiển thị
      const shuffled = this.pool.slice().sort(() => 0.5 - Math.random());
      this.displayedItems = shuffled.slice(0, 5);
    },
    spin() {
      if (this.pool.length === 0) return;

      this.spinning = true;
      this.generateDisplay();

      const chosenIndex = Math.floor(
        Math.random() * this.displayedItems.length
      );
      const chosenItem = this.displayedItems[chosenIndex];

      // Xoay vòng quay đến vị trí tương ứng
      const anglePerSlice = 360 / 5;
      const targetRotation =
        360 * 5 + (360 - chosenIndex * anglePerSlice - anglePerSlice / 2);

      this.rotation = 0;

      setTimeout(() => {
        this.rotation = targetRotation;
        this.result = chosenItem;

        // nếu là A, loại khỏi pool
        if (chosenItem === "A") {
          this.aUsed = true;
          this.pool = this.pool.filter((item) => item !== "A");
        } else {
          const indexInPool = this.pool.indexOf(chosenItem);
          if (indexInPool !== -1) this.pool.splice(indexInPool, 1);
        }

        this.spinning = false;
      }, 500); // delay nhỏ cho mượt
    },
    getSliceStyle(index) {
      const angle = (360 / 5) * index;
      return {
        transform: `rotate(${angle}deg) skewY(-60deg)`,
        backgroundColor: ["#f99", "#9f9", "#99f", "#fc0", "#0cf"][index % 5],
      };
    },
  },
};
</script>

<style scoped>
.wheel-container {
  text-align: center;
  font-family: sans-serif;
  margin-top: 30px;
}

.wheel {
  position: relative;
  margin: 0 auto;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  border: 6px solid #444;
  transition: transform 3s cubic-bezier(0.33, 1, 0.68, 1);
}

.slice {
  position: absolute;
  width: 50%;
  height: 50%;
  left: 50%;
  top: 50%;
  transform-origin: 0% 0%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  font-size: 20px;
}

.arrow {
  font-size: 40px;
  margin: 20px 0;
  color: red;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

button:disabled {
  background-color: #aaa;
  cursor: not-allowed;
}

.notice {
  color: red;
  font-style: italic;
}
</style>
