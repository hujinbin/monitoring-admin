<template>
  <div class="dashboard-page">
    <section class="hero-panel">
      <div>
        <div class="eyebrow">Performance Monitoring</div>
        <h1>监控总览</h1>
        <p>
          聚合接口、错误、告警与域名健康状态，默认连接线上后端
          <span class="endpoint">https://monitor.leheavengame.com/api</span>
        </p>
      </div>
      <div class="hero-badge">
        <Icon icon="DashboardOutlined" />
      </div>
    </section>

    <section class="stats-grid">
      <article
        v-for="item in statsCards"
        :key="item.title"
        class="stats-card"
      >
        <div class="stats-card__icon" :class="`is-${item.tone}`">
          <Icon :icon="item.icon" />
        </div>
        <div class="stats-card__body">
          <span class="stats-card__title">{{ item.title }}</span>
          <strong class="stats-card__value">{{ item.value }}</strong>
          <span class="stats-card__delta" :class="`is-${item.tone}`">{{ item.delta }}</span>
        </div>
      </article>
    </section>

    <section class="dashboard-main">
      <a-card title="核心指标趋势" :bordered="false" class="dashboard-card trend-card">
        <div class="trend-list">
          <div v-for="metric in trendMetrics" :key="metric.label" class="trend-row">
            <div class="trend-row__meta">
              <span>{{ metric.label }}</span>
              <strong>{{ metric.value }}</strong>
            </div>
            <div class="trend-bar">
              <span class="trend-bar__fill" :style="{ width: `${metric.percent}%` }" />
            </div>
            <span class="trend-row__foot">{{ metric.hint }}</span>
          </div>
        </div>
      </a-card>

      <a-card title="服务健康状态" :bordered="false" class="dashboard-card service-card">
        <div class="service-list">
          <div v-for="service in serviceHealth" :key="service.name" class="service-item">
            <div class="service-item__name">
              <Icon :icon="service.icon" />
              <span>{{ service.name }}</span>
            </div>
            <a-tag :color="service.color">{{ service.status }}</a-tag>
          </div>
        </div>
      </a-card>
    </section>

    <section class="quick-actions">
      <a-card title="监控快捷入口" :bordered="false" class="dashboard-card">
        <div class="quick-actions__grid">
          <div v-for="entry in quickLinks" :key="entry.title" class="quick-entry">
            <div class="quick-entry__icon">
              <Icon :icon="entry.icon" />
            </div>
            <div>
              <div class="quick-entry__title">{{ entry.title }}</div>
              <div class="quick-entry__desc">{{ entry.desc }}</div>
            </div>
          </div>
        </div>
      </a-card>
    </section>
  </div>
</template>

<script lang="ts" setup>
interface StatsCard {
    title: string;
    value: string;
    delta: string;
    icon: string;
    tone: 'blue' | 'green' | 'orange' | 'red';
}

interface TrendMetric {
    label: string;
    value: string;
    percent: number;
    hint: string;
}

interface ServiceHealthItem {
    name: string;
    status: string;
    color: string;
    icon: string;
}

interface QuickLinkItem {
    title: string;
    desc: string;
    icon: string;
}

const statsCards: StatsCard[] = [
    { title: '今日请求量', value: '128,430', delta: '+12.8%', icon: 'ApiOutlined', tone: 'blue' },
    { title: 'JS 错误数', value: '326', delta: '-8.4%', icon: 'BugOutlined', tone: 'red' },
    { title: '告警处理率', value: '91.6%', delta: '+4.2%', icon: 'AlertOutlined', tone: 'orange' },
    { title: '可用域名数', value: '42', delta: '+3', icon: 'GlobalOutlined', tone: 'green' },
];

const trendMetrics: TrendMetric[] = [
    { label: '接口成功率', value: '99.42%', percent: 99, hint: '较昨日提升 0.18%' },
    { label: '首屏加载达标率', value: '87.20%', percent: 87, hint: '移动端仍需继续优化' },
    { label: '错误收敛进度', value: '74.00%', percent: 74, hint: '重点关注支付与登录链路' },
    { label: '告警响应时效', value: '16 min', percent: 68, hint: '核心告警已接近目标线' },
];

const serviceHealth: ServiceHealthItem[] = [
    { name: '事件上报服务', status: '正常', color: 'green', icon: 'CloudServerOutlined' },
    { name: '聚合分析服务', status: '高负载', color: 'orange', icon: 'ClusterOutlined' },
    { name: '告警通知服务', status: '延迟', color: 'gold', icon: 'NotificationOutlined' },
    { name: '域名探活任务', status: '正常', color: 'green', icon: 'CheckCircleOutlined' },
];

const quickLinks: QuickLinkItem[] = [
    { title: '错误追踪', desc: '快速定位高频异常与堆栈聚合', icon: 'BugOutlined' },
    { title: '接口监控', desc: '查看接口耗时、成功率与波动趋势', icon: 'LineChartOutlined' },
    { title: '告警中心', desc: '处理告警阈值、联系人和通知策略', icon: 'BellOutlined' },
    { title: '域名健康', desc: '统一管理站点与子域名的可用性状态', icon: 'GlobalOutlined' },
];
</script>

<style lang="less" scoped>
.dashboard-page {
    min-height: 100%;
    padding: 24px;
    background:
        radial-gradient(circle at top right, rgba(17, 136, 255, 0.12), transparent 28%),
        linear-gradient(180deg, #f4f8ff 0%, #eef3f8 100%);
}

.hero-panel {
    display: flex;
    justify-content: space-between;
    gap: 24px;
    margin-bottom: 24px;
    padding: 28px 32px;
    border-radius: 24px;
    background: linear-gradient(135deg, #0f172a 0%, #1d4ed8 100%);
    color: #fff;

    h1 {
        margin: 8px 0 12px;
        color: #fff;
        font-size: 32px;
    }

    p {
        max-width: 720px;
        margin: 0;
        color: rgba(255, 255, 255, 0.8);
        line-height: 1.7;
    }
}

.eyebrow {
    font-size: 12px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.72);
}

.endpoint {
    display: inline-block;
    margin-left: 8px;
    padding: 2px 10px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.14);
    color: #fff;
}

.hero-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 120px;
    min-height: 120px;
    border-radius: 32px;
    background: rgba(255, 255, 255, 0.14);
    font-size: 54px;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 16px;
    margin-bottom: 24px;
}

.stats-card {
    display: flex;
    gap: 14px;
    padding: 20px;
    border-radius: 22px;
    background: rgba(255, 255, 255, 0.92);
    box-shadow: 0 16px 40px rgba(15, 23, 42, 0.06);

    &__icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 52px;
        height: 52px;
        border-radius: 18px;
        font-size: 22px;

        &.is-blue {
            color: #2563eb;
            background: rgba(37, 99, 235, 0.12);
        }

        &.is-green {
            color: #059669;
            background: rgba(5, 150, 105, 0.12);
        }

        &.is-orange {
            color: #d97706;
            background: rgba(217, 119, 6, 0.12);
        }

        &.is-red {
            color: #dc2626;
            background: rgba(220, 38, 38, 0.12);
        }
    }

    &__body {
        display: flex;
        flex: 1;
        flex-direction: column;
        gap: 6px;
    }

    &__title {
        color: #64748b;
        font-size: 13px;
    }

    &__value {
        color: #0f172a;
        font-size: 28px;
        line-height: 1.2;
    }

    &__delta {
        font-size: 13px;
        font-weight: 600;

        &.is-blue,
        &.is-green {
            color: #059669;
        }

        &.is-orange {
            color: #d97706;
        }

        &.is-red {
            color: #dc2626;
        }
    }
}

.dashboard-main {
    display: grid;
    grid-template-columns: minmax(0, 2fr) minmax(320px, 1fr);
    gap: 16px;
    margin-bottom: 24px;
}

.dashboard-card {
    border-radius: 22px;
    box-shadow: 0 16px 40px rgba(15, 23, 42, 0.06);
}

:deep(.ant-card-head) {
    border-bottom: none;
}

.trend-list {
    display: grid;
    gap: 18px;
}

.trend-row {
    display: grid;
    gap: 10px;

    &__meta,
    &__foot {
        display: flex;
        justify-content: space-between;
        color: #475569;
        font-size: 13px;
    }

    &__meta strong {
        color: #0f172a;
        font-size: 15px;
    }
}

.trend-bar {
    height: 10px;
    overflow: hidden;
    border-radius: 999px;
    background: #e2e8f0;

    &__fill {
        display: block;
        height: 100%;
        border-radius: inherit;
        background: linear-gradient(90deg, #2563eb 0%, #06b6d4 100%);
    }
}

.service-list,
.quick-actions__grid {
    display: grid;
    gap: 14px;
}

.service-item,
.quick-entry {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 14px 16px;
    border-radius: 16px;
    background: #f8fafc;
}

.service-item__name,
.quick-entry {
    color: #0f172a;
}

.service-item__name {
    display: flex;
    align-items: center;
    gap: 10px;
}

.quick-actions__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
}

.quick-entry {
    justify-content: flex-start;

    &__icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 42px;
        height: 42px;
        border-radius: 14px;
        background: rgba(37, 99, 235, 0.12);
        color: #2563eb;
        font-size: 18px;
    }

    &__title {
        color: #0f172a;
        font-weight: 600;
    }

    &__desc {
        color: #64748b;
        font-size: 13px;
    }
}

@media (max-width: 1200px) {
    .stats-grid,
    .quick-actions__grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .dashboard-main {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 768px) {
    .dashboard-page {
        padding: 16px;
    }

    .hero-panel {
        flex-direction: column;
        padding: 22px;
    }

    .stats-grid,
    .quick-actions__grid {
        grid-template-columns: 1fr;
    }
}
</style>
