const n=`---
title: Spring Boot学习笔记
date: 2024-10-08
lang: zh_CN
categories:
 - study
---

# Spring Boot学习笔记

## 创建项目

可以通过spring.io[https://start.spring.io/]下载需要的包，也可以通过vscode提供的插件来开始一个新的项目。

在开始一个新的maven项目后，通过配置\`application.properties\`来设置数据库：

\`\`\`properties
spring.datasource.url=jdbc:mysql://localhost:3306/your_database_name?useSSL=false&serverTimezone=UTC
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
\`\`\`

注意要在\`pom.xml\`中添加最新的\`mysql-connector-java\`驱动

\`\`\`xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.34</version> <!-- 使用最新稳定版本 -->
</dependency>
\`\`\`

执行\`mvn install\`来安装依赖

## Maven

maven是一个构建工具，可以用来管理项目的依赖和构建过程。它使用\`pom.xml\`文件来描述项目的结构、依赖关系以及构建配置。

### 常用命令

- \`mvn -DskipTests=true clean install\`: 跳过测试并安装项目
- \`mvn -DskipTests=true clean package\`: 跳过测试并构建项目，打包为jar或war文件

也可以分别执行以下命令：

- \`mvn clean\`: 删除target目录下的所有内容
- \`mvn compile\`: 编译源代码
- \`mvn test\`: 运行测试
- \`mvn package\`: 将项目打包成jar或war文件
- \`mvn install\`: 将项目安装到本地仓库

## 核心注解

### 组件注解

- \`@Component\`: 通用的Spring组件，被Spring容器管理
- \`@Service\`: 业务逻辑层组件，是\`@Component\`的特化
- \`@Repository\`: 数据访问层组件
- \`@Controller\`: 控制器组件，处理HTTP请求
- \`@Configuration\`: 配置类，用于定义Bean

### 依赖注入

- \`@Autowired\`: Spring提供的自动装配，按类型注入
- \`@Resource\`: Java的标准注解，按名称注入，JSR-250标准
- \`@Value\`: 注入配置属性值

\`\`\`java
@Service
public class UserService {
    @Resource
    private UserRepository userRepository;

    @Value("\${app.default.timeout:5000}")
    private int timeout;
}
\`\`\`

### 配置相关

- \`@Bean\`: 在配置类中定义Bean
- \`@ConfigurationProperties\`: 绑定配置属性到对象

\`\`\`java
@Configuration
public class AppConfig {
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
\`\`\`

## 事件驱动编程

Spring提供了强大的事件机制，支持松耦合的组件通信。

### 事件定义

\`\`\`java
public class UserRegisteredEvent extends ApplicationEvent {
    private final String username;

    public UserRegisteredEvent(Object source, String username) {
        super(source);
        this.username = username;
    }
}
\`\`\`

### 事件发布

\`\`\`java
@Service
public class UserService {
    @Resource
    private ApplicationEventPublisher eventPublisher;

    public void registerUser(String username) {
        // 业务逻辑
        eventPublisher.publishEvent(new UserRegisteredEvent(this, username));
    }
}
\`\`\`

### 事件监听

\`\`\`java
@Component
public class EmailService {
    @EventListener
    public void handleUserRegistered(UserRegisteredEvent event) {
        // 发送欢迎邮件
        sendWelcomeEmail(event.getUsername());
    }
}
\`\`\`

## Kafka集成

Spring Boot通过\`spring-kafka\`提供了Kafka的便捷集成。

### 依赖配置

\`\`\`xml
<dependency>
    <groupId>org.springframework.kafka</groupId>
    <artifactId>spring-kafka</artifactId>
</dependency>
\`\`\`

### 配置属性

\`\`\`properties
spring.kafka.bootstrap-servers=localhost:9092
spring.kafka.consumer.group-id=my-group
spring.kafka.consumer.auto-offset-reset=earliest
\`\`\`

### 消息消费

\`\`\`java
@Component
public class MessageConsumer {
    @KafkaListener(topics = "user-events", groupId = "user-service")
    public void handleMessage(String message) {
        log.info("收到消息: {}", message);
    }
}
\`\`\`

### 消息发送

\`\`\`java
@Service
public class MessageProducer {
    @Resource
    private KafkaTemplate<String, String> kafkaTemplate;

    public void sendMessage(String topic, String message) {
        kafkaTemplate.send(topic, message);
    }
}
\`\`\`

## 设计模式

### Builder模式

Builder模式的目的是为了创建复杂对象，通过链式调用方法来设置对象的属性，最后调用build方法来创建对象。从而避免了构造函数参数过多的问题。

\`\`\`java
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MetricInputMessage {
    private String modelName;
    private String instance;
    private Instant timestamp;
    private String metricName;
    private String value;
}

// 使用示例
MetricInputMessage message = MetricInputMessage.builder()
    .modelName("fault_prediction_model")
    .instance("instance-001")
    .timestamp(Instant.now())
    .metricName("cpu_usage")
    .value("85.5")
    .build();
\`\`\`

### 策略模式

通过接口定义算法族，让算法的变化独立于使用算法的客户端。

\`\`\`java
public interface MetricFilter {
    boolean shouldProcess(MetricInputMessage message);
    String getFilterName();
    default int getPriority() { return 100; }
}

@Component
public class MetricNameFilter implements MetricFilter {
    @Override
    public boolean shouldProcess(MetricInputMessage message) {
        return message.getMetricName() != null;
    }

    @Override
    public String getFilterName() {
        return "MetricNameFilter";
    }
}
\`\`\`

### 适配器模式

将不兼容的接口转换为客户端期望的接口。

\`\`\`java
@Component
public class KafkaAdapter {
    @Resource
    private KafkaTemplate<String, String> kafkaTemplate;

    public void sendMetric(MetricInputMessage metric) {
        String message = JSON.toJSONString(metric);
        kafkaTemplate.send("metrics-input", message);
    }

    @KafkaListener(topics = "prediction-results")
    public void handleResult(String message) {
        // 处理预测结果
    }
}
\`\`\`

## 异步处理

### CompletableFuture

Java 8引入的异步编程工具，支持链式调用和组合操作。

\`\`\`java
@Service
public class AsyncService {
    public CompletableFuture<String> processAsync(String input) {
        return CompletableFuture.supplyAsync(() -> {
            // 模拟耗时操作
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
            return "处理结果: " + input;
        });
    }
}
\`\`\`

### @Async注解

Spring提供的异步方法注解。

\`\`\`java
@Service
public class EmailService {
    @Async
    public CompletableFuture<Void> sendEmailAsync(String to, String content) {
        // 发送邮件逻辑
        return CompletableFuture.completedFuture(null);
    }
}
\`\`\`

## 配置管理

### 外部化配置

通过\`@Value\`注解注入配置值：

\`\`\`java
@Service
public class AiService {
    @Value("\${ai.model.default:fault_prediction_model}")
    private String defaultModel;

    @Value("\${ai.kafka.topics.metrics-input:metrics-input}")
    private String metricsInputTopic;
}
\`\`\`

### 配置属性绑定

使用\`@ConfigurationProperties\`绑定复杂配置：

\`\`\`java
@ConfigurationProperties(prefix = "ai.kafka")
@Data
public class KafkaProperties {
    private String bootstrapServers;
    private String groupId;
    private Topics topics = new Topics();

    @Data
    public static class Topics {
        private String metricsInput = "metrics-input";
        private String predictionResults = "prediction-results";
    }
}
\`\`\`

## 过滤器链模式

实现可配置的过滤器链，支持优先级排序：

\`\`\`java
@Configuration
public class FilterConfig {
    @Bean
    public List<MetricFilter> orderedFilters(List<MetricFilter> filters) {
        return filters.stream()
            .sorted(Comparator.comparingInt(MetricFilter::getPriority))
            .collect(Collectors.toList());
    }
}

// 使用过滤器链
private boolean shouldProcess(MetricInputMessage message) {
    return filters.stream()
        .allMatch(filter -> filter.shouldProcess(message));
}
\`\`\`

## 最佳实践

1. **合理使用注解**: 选择合适的组件注解(\`@Service\`, \`@Component\`, \`@Repository\`)
2. **依赖注入**: 优先使用\`@Resource\`按名称注入，避免循环依赖
3. **配置外部化**: 使用\`@Value\`和\`@ConfigurationProperties\`管理配置
4. **事件驱动**: 通过Spring事件机制实现松耦合
5. **异步处理**: 使用\`@Async\`或\`CompletableFuture\`处理耗时操作
6. **异常处理**: 在关键位置添加try-catch和日志记录
`;export{n as default};
