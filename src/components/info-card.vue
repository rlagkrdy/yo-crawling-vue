<template>
  <div class="info-card-box">
    <div class="image-box">
      <img src="https://miro.medium.com/max/1200/1*NW08J81iLpExTFTz4wnWHQ.jpeg" alt="yo-info-image" class="yo-image">
    </div>

    <div class="info-contents-box">
      <div class="info-contents-header-box">
        <h3 class="info-title">제목입니다.</h3>

        <p class="info-date">2020-07-03</p>
      </div>

      <article class="info-describe">
        내용을 입력해야 합니다.
        이것은 바로 화면에 보여야 하는 내용들입니다.
        당신은 이것에 만족하시나요?
      </article>

      <div class="info-keywords-box">
        <span class="info-keyword-tag">키워드1</span>
        <span class="info-keyword-tag">키워드1</span>
        <span class="info-keyword-tag">키워드1</span>
        <span class="info-keyword-tag">키워드1</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'infoCard'
  };
</script>

<style scoped>
  .info-card-box {
    width: 100%;
    flex: 0 1 calc(33.33% - 25px);
    margin: 0 12.5px 25px;
    background: #fff;
    box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }

  .image-box {
    position: relative;
    width: 100%;
    padding-bottom: 50%;
    overflow: hidden;
  }

  .yo-image {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 101%;
  }

  .info-contents-box {
    display: flex;
    flex-direction: column;
    padding: 20px;
  }

  .info-contents-header-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .info-title {
    font-size: 19px;
    font-weight: bold;
    line-height: 1.47;
  }

  .info-date {
    font-size: 12px;
  }

  .info-describe {
    font-size: 14px;
    line-height: 1.64;
    margin-bottom: 16px;
  }

  .info-keywords-box {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  .info-keyword-tag {
    display: block;
    font-size: 10px;
    padding: 4px 10px;
    line-height: 1;
    background: #fff;
    border-radius: 2px;
    border: 1px solid #e0e0e0;
    margin: 0 8px 4px 0;
  }

  .info-keyword-tag:last-child {
    margin-right: 0;
  }
</style>
